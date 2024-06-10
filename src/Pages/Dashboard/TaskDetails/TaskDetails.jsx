import { useLoaderData, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useUserFetch from "../../../Hooks/useUserFetch";
import Countdown from 'react-countdown';
const TaskDetails = () => {
    const userData = useUserFetch();
    const tasks = useLoaderData();
    const { id } = useParams();
    const task = tasks.find(task => task._id === id);
    const currentTime = new Date();
    const formattedTime = `${currentTime.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;

    const handleAddSubmission = e => {
        e.preventDefault();
        const form = e.target;
        const submission_details = form.submission_Details.value;

        const submissionData = {
            task_id: task._id,
            task_title: task.task_title,
            task_detail: task.task_detail,
            task_img_url: task.task_image_url,
            payable_amount: task.payable_amount,
            worker_email: userData.email,
            submission_details: submission_details,
            worker_name: userData.name,
            creator_name: task.creator_name || "N/A",
            creator_email: task.creator_email,
            current_date: formattedTime,
            status: 'pending'
        };

        console.log(submissionData);

        fetch('http://localhost:5000/submission', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(submissionData)
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                Swal.fire({
                    title: "Success!",
                    text: "Submission Successful",
                    icon: "success"
                });
            }
        });
    }
    const completionDateTime = new Date(task.completion_date).getTime();
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span>Task completed!</span>;
        } 
        else {
            return (
                <span>
                    {days}d {hours}h {minutes}m {seconds}s
                </span>
            );
        }
    };

    return (
        <div className="container mx-auto my-8">
            <div className="max-w-3xl mx-auto px-4">
                <img className="w-full h-[500px] rounded-lg" src={task.task_image_url} alt={task.task_title} />
                <div className="text-center">
                    <h2 className="text-3xl font-bold mt-6 mb-4 mx-auto ">{task.task_title}</h2>
                </div>
                <h2 className="text-3xl font-bold mb-2">Important Info</h2>
                <hr />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex gap-2">
                        <h2 className="md:text-2xl font-semiBold">Creator:</h2>
                        <p className="md:text-2xl font-semiBold">{task.creator_name || "N/A"}</p>
                    </div>
                    <div className="flex gap-2">
                        <h2 className="md:text-2xl font-semiBold">Creator Email:</h2>
                        <p className="md:text-2xl font-semiBold">{task.creator_email}</p>
                    </div>
                    <div className="flex gap-2">
                        <h2 className="md:text-2xl font-semiBold">Task Quantity:</h2>
                        <p className="md:text-2xl font-semiBold">{task.task_quantity}</p>
                    </div>
                    <div className="flex gap-2">
                        <h2 className="md:text-2xl font-semiBold">Payable Amount:</h2>
                        <p className="md:text-2xl font-semiBold">{task.payable_amount}</p>
                    </div>
                    <div className="flex gap-2">
                        <h2 className="md:text-2xl font-semiBold">Completion Date:</h2>
                        <p className="md:text-2xl font-semiBold">{task.completion_date}</p>
                    </div>
                    <div className="flex gap-2">
                        <h2 className="md:text-2xl font-semiBold">Submission Info:</h2>
                        <p className="md:text-2xl font-semiBold">{task.submission_info}</p>
                    </div>
                    <div className="flex gap-2">
                        <h2 className="md:text-2xl font-semiBold">Current Time:</h2>
                        <p className="md:text-2xl font-semiBold">{task.current_time}</p>
                    </div>
                    <div className="flex gap-2">
                        <h2 className="md:text-2xl font-semiBold">Time Remaining:</h2>
                        <p className="md:text-2xl font-semiBold">
                            <Countdown date={completionDateTime} renderer={renderer} />
                        </p>
                    </div>
                </div>
                <div className="mt-8">
                    <h2 className="text-3xl font-bold mb-2">Submit Your Work</h2>
                    <hr />
                    <form onSubmit={handleAddSubmission} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Submission Details</label>
                                <textarea required name="submission_Details" placeholder="Enter submission details" className="textarea textarea-bordered w-full" />
                            </div>
                            <div>
                                <button className="btn w-full text-gray-100 hover:text-white bg-indigo-500">Submit Task</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;
