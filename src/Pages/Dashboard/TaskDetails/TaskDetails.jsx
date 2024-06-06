import { useContext } from "react";
import { Helmet } from "react-helmet";
import { useLoaderData, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Providers/AuthProvider";

const TaskDetails = () => {
    const { user } = useContext(AuthContext)
    const tasks = useLoaderData();
    const { id } = useParams();
    const task = tasks.find(task => task._id == id);
    const currentTime = new Date();
    const formattedTime = `${currentTime.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
    const handleAddtask = e => {
        e.preventDefault()
        const form = e.target
        const User_Name = form.User_Name.value
        const Donator_Email = form.Donator_Email.value
        const task_name = form.task_name.value
        const Pickup_Location = form.Pickup_Location.value
        const Expired_Date = form.Expired_Date.value
        const User_Email = form.User_Email.value
        const Image = form.Image.value
        const Donator_Image = form.Donator_Image.value
        const Additional_Notes = form.Additional_Notes.value

        const requestedtask = { Donator_Email, task_name, User_Name, Pickup_Location, User_Email, Image, Donator_Image, Additional_Notes, formattedTime, Expired_Date }
        console.log(requestedtask);
        fetch('https://assignment-p11-server.vercel.app/requests', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(requestedtask)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    const updateData = { task_Status: 'Pending' };
                    fetch(`https://assignment-p11-server.vercel.app/tasks/${task._id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updateData) 
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.insertedId) {
                                Swal.fire({
                                    title: "Success!",
                                    text: "Request Succesful",
                                    icon: "success"
                                })
                            }
                        })
                }
            })
    }
    return (
        <div className="container mx-auto my-8">
            <Helmet>
                <title>HomeSpot | task Details of {task.task_name}</title>
            </Helmet>
            <div className="max-w-3xl mx-auto px-4">
                <img className="w-full h-[500px] rounded-lg" src={task.Image} alt="" />
                <div className="text-center">
                    <h2 className="text-3xl font-bold mt-6 mb-4 mx-auto ">{task.task_name}</h2>
                </div>
                <h2 className="text-3xl font-bold mb-2">Importent Info</h2>
                <hr />
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <h2 className="md:text-2xl font-semiBold">Donator:</h2>
                        <p className="md:text-2xl font-semiBold">{task.User_Name}</p>
                    </div>
                    <div className="flex gap-2">
                        <h2 className="md:text-2xl font-semiBold">Pickup Location:</h2>
                        <p className="md:text-2xl font-semiBold">{task.Pickup_Location}</p>
                    </div>
                </div>
                <div className="mt-8">
                    <h2 className="text-3xl font-bold mb-2">task Details</h2>
                    <hr />
                    <div className="flex justify-between gap-4">
                        <div className="flex gap-1">
                            <h2 className="font-semibold mb-2">Quantity:</h2>
                            <p>{task.Quantity}</p>
                        </div>
                        <div className="flex gap-1">
                            <h2 className="font-semibold">Expired Date/Time :</h2>
                            <p>{task.Expired_Date}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <button className="btn btn-outline w-full btn-neutral" onClick={() => document.getElementById('my_modal_4').showModal()}>Request</button>
                    <dialog id="my_modal_4" className="modal z-0">
                        <div className="modal-box w-11/12 max-w-5xl">
                            <div>
                                <div className="text-center">
                                    <h2 className="text-3xl font-bold mb-6">task Request</h2>
                                    <div className="modal-action">
                                        <form method="dialog">
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        </form>
                                    </div>
                                </div>
                                <form onSubmit={handleAddtask} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Donator Name
                                            </label>
                                            <input required type="text" disabled defaultValue={task.User_Name} placeholder="Enter User Name" name="User_Name" className="input input-bordered w-full" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Donator Email</label>
                                            <input disabled defaultValue={task.User_Email} required type="email" placeholder="Enter User Email" name="Donator_Email" className="input input-bordered w-full" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Donator Image</label>
                                            <input type="url" disabled defaultValue={task.Donator_Image} placeholder="Enter task Donator Image" name="Donator_Image" className="input input-bordered w-full" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">task Id</label>
                                            <input required type="text" disabled defaultValue={task._id} placeholder="Enter task Image" name="Image" className="input input-bordered w-full" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">task Name</label>
                                            <input required type="text" disabled defaultValue={task.task_name} placeholder="Enter task Name" name="task_name" className="input input-bordered w-full" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">task Image</label>
                                            <input required type="url" disabled defaultValue={task.Image} placeholder="Enter task Image" name="Image" className="input input-bordered w-full" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Pickup Location
                                            </label>
                                            <input required disabled type="text" defaultValue={task.Pickup_Location} placeholder="Enter task Pickup location" name="Pickup_Location" className="input input-bordered w-full" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Expired Date
                                            </label>
                                            <input required type="date" disabled defaultValue={task.Expired_Date} placeholder="Enter task Expired Date" name="Expired_Date" className="input input-bordered w-full" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">User Email</label>
                                            <input defaultValue={user.email} disabled required type="text" placeholder="Enter task User Email" name="User_Email" className="input input-bordered w-full" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Request Time</label>
                                            <input required type="text" disabled defaultValue={formattedTime} placeholder="Enter task Image" name="Image" className="input input-bordered w-full" />
                                        </div>
                                        <div>
                                            <div className="mb-2">
                                                <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
                                                <textarea required defaultValue={task.Additional_Notes} type="text" placeholder="Enter task Additional Notes" name="Additional_Notes" className="textarea textarea-bordered w-full md:w-[204%]" />
                                            </div>
                                            <div>
                                                <button className="btn w-full md:w-[204%] text-gray-100 
                            hover:text-white btn-info">Request task
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;