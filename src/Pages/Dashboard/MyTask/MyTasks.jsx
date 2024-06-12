import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const MyTasks = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        fetch('https://final-project-server-jade.vercel.app/tasks')
            .then(res => res.json())
            .then(data => {
                setTasks(data)
            })
    }, [])


    const handleDelete = _id => {
        Swal.fire({
            title: "Are you sure you want to delete?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, do it!'
        }).then(result => {
            if (result.isConfirmed) {
                fetch(`https://final-project-server-jade.vercel.app/tasks/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire("Deleted!", "Your task has been deleted.", "success");
                            const updatedtasks = tasks.filter(task => task._id !== _id);
                            setTasks(updatedtasks);
                        }
                    });
            }
        });
    };

    if (!tasks || tasks.length === 0) {
        return (
            <div className="text-center">
                <h2>You have not added any tasks</h2>
            </div>
        );
    }
    const handleUpdateTask = (e , _id) => {
        e.preventDefault()
        const form = e.target
        const task_title = form.task_title.value
        const task_detail = form.task_detail.value
        const submission_info = form.submission_info.value
        const updatedTask = {task_title,task_detail, submission_info }
        console.log(updatedTask);
        fetch(`https://final-project-server-jade.vercel.app/tasks/${_id}` , {
            method:'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body:   JSON.stringify(updatedTask)
        })
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount > 0) {
                Swal.fire({
                    title: "Good job!",
                    text: "Tour Updated successfuly!",
                    icon: "success"
                  })
            }
        });
    }
    return (
        <div>
            <table className="md:min-w-full divide-y table divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Task Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Payable Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Task Quantity
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y  divide-gray-200">
                    {tasks.filter(task => task?.creator_email === user?.email).map((task, index) => (
                        <tr key={task._id} className={index % 2 === 0 ? "bg-gray-300" : "bg-white"}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <h2 className="md:text-lg font-semibold">{task.task_title}</h2>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <h2 className="md:text-lg font-semibold">{task.payable_amount}</h2>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <h2 className="md:text-lg font-semibold">{task.task_quantity}</h2>
                            </td>
                            <td className="px-6 gap-4 py-4 flex whitespace-nowrap text-sm text-gray-500">
                                <button className="text-indigo-600 hover:text-indigo-900" onClick={() => document.getElementById('my_modal_2').showModal()}>
                                    <FaEdit />
                                </button>
                                <dialog id="my_modal_2" className="modal">
                                    <div className="modal-box">
                                        <h2 className="text-lg font-semibold text-center text-black mb-2">Update Form</h2>
                                        <form onSubmit={() => handleUpdateTask(task._id)}>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Task Title</label>
                                                <input name="task_title" defaultValue={task.task_title} className="input input-md w-full" type="text" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Task Detail</label>
                                                <input name="task_detail" defaultValue={task.task_detail} className="input input-md w-full" type="text" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">submission Info</label>
                                                <input name="submission_info" defaultValue={task.submission_info} className="input input-md w-full" type="text" />
                                            </div>
                                            <button className="bg-indigo-500 w-full btn">Update Task</button>
                                        </form>
                                    </div>
                                    <form method="dialog" className="modal-backdrop">
                                        <button>close</button>
                                    </form>
                                </dialog>
                                <button onClick={() => handleDelete(task._id)} className="text-red-600 hover:text-red-900 ml-2">
                                    <FaDeleteLeft />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyTasks;
