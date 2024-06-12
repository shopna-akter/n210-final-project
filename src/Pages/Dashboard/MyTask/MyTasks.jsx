import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const MyTasks = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/tasks')
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
                fetch(`http://localhost:5000/tasks/${_id}`, {
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
                                        <div>
                                        <span>{task.task_title}</span>
                                        </div>
                                        <div>
                                            
                                        </div>
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
