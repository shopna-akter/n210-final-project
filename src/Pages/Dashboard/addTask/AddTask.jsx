import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUserFetch from "../../../Hooks/useUserFetch";

const AddTask = () => {
    const userData = useUserFetch()
    const axiosSecure = useAxiosSecure()
    const handleAddTask = e => {
        e.preventDefault()
        const form = e.target
        const task_title = form.task_title.value;
        const task_detail = form.task_detail.value;
        const task_quantity = form.task_quantity.value;
        const payable_amount = form.payable_amount.value;
        const completion_date = form.completion_date.value;
        const submission_info = form.submission_info.value;
        const task_image_url = form.task_image_url.value;
        const newTask = {
            task_title, task_detail, task_quantity, payable_amount, completion_date, submission_info, task_image_url, creator_email: userData.email, creator_name: userData.name, current_time: new Date()
        };
        if (task_quantity * payable_amount > userData?.coin) {
            Swal.fire({
                title: "Not enough coin!",
                text: "Purchase coin from purchase coin!",
                icon: "warning"
            })
        }
        else {
            axiosSecure.post('http://localhost:5000/tasks', newTask, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: "Good job!",
                            text: "Task added successfuly!",
                            icon: "success"
                        })
                    }
                })
        }
    }
    return (
        <div className="flex flex-col items-center justify-center py-6 bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-5xl">
                <h2 className="text-2xl font-bold text-center mb-4">Add New Task</h2>
                <p className="text-center text-gray-600 mb-8">
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. <br /> The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.
                </p>
                <form onSubmit={handleAddTask} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Task Title</label>
                            <input required type="text" name="task_title" className="input input-bordered w-full" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Task Detail</label>
                            <textarea required name="task_detail" className="textarea textarea-bordered w-full" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Task Quantity</label>
                            <input required type="number" name="task_quantity" className="input input-bordered w-full" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Payable Amount (per Task)</label>
                            <input required type="number" name="payable_amount" className="input input-bordered w-full" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Completion Date</label>
                            <input required type="date" name="completion_date" className="input input-bordered w-full" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Submission Info</label>
                            <textarea required name="submission_info" className="textarea textarea-bordered w-full" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Task Image URL</label>
                            <input required type="url" name="task_image_url" className="input input-bordered w-full" />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <button className="btn w-full text-gray-100 hover:text-white bg-indigo-500">Add Task</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTask;