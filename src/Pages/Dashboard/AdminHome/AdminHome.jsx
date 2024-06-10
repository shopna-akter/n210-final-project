import { useState, useEffect } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        axiosSecure.get("/tasks")
            .then(response => {
                setTasks(response.data);
            });
    };

    const handleDeleteTask = (taskId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const isAdmin = true
                axiosSecure.delete(`/tasks/${taskId}` , isAdmin)
                    .then(response => {
                        if (response.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Task has been deleted.",
                                icon: "success"
                            });
                            fetchTasks(); // Update tasks after deletion
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: "Failed to delete task.",
                                icon: "error"
                            });
                        }
                    });
            }
        });
    };

    return (
        <div>
            <div className="flex justify-between my-4">
                <h2 className="text-3xl">Task List</h2>
                <h2 className="text-3xl">Total Tasks: {tasks.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="w-1/6 px-4 py-2">Task Title</th>
                            <th className="w-2/6 px-4 py-2">Task Creator Name</th>
                            <th className="w-1/6 px-4 py-2">Task Quantity</th>
                            <th className="w-1/6 px-4 py-2">Coin Needed</th>
                            <th className="w-1/6 px-4 py-2">Availability</th>
                            <th className="w-1/6 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task._id} className="bg-gray-100">
                                <td className="border px-4 py-2">{task.task_title}</td>
                                <td className="border px-4 py-2">{task.creator_name}</td>
                                <td className="border px-4 py-2">{task.task_quantity}</td>
                                <td className="border px-4 py-2">{task.coin}</td>
                                <td className="border px-4 py-2">{task.payable_amount}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => handleDeleteTask(task._id)}
                                        className="btn btn-ghost btn-sm text-red-600">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminHome;
