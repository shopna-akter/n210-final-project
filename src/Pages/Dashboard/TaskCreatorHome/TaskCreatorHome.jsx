import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useUserFetch from '../../../Hooks/useUserFetch';

const TaskCreatorHome = () => {
    const userData = useUserFetch();
    const axiosSecure = useAxiosSecure()
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedTasks, setSelectedTasks] = useState([]);
    useEffect(() => {
        axiosSecure.get(`http://localhost:5000/submission`)
            .then(res => {
                const tasks = res.data.filter(task => userData?.email == task.creator_email)
                const pendingTasks = tasks.filter(pendingTask => pendingTask.status == 'pending')
                setSelectedTasks(pendingTasks)
            })
    }, [userData, axiosSecure])


    const handleReject = id => {
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
                axiosSecure.delete(`/submission/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        })
    }
    const handleApprove = async (id, worker_email, payable_amount) => {
        const newStatus = 'approved'
        const updates = { newStatus, worker_email, payable_amount }
        axiosSecure.put(`/submission/${id}`, updates)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Approved successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    const openModal = (submission) => {
        setSelectedTasks(submission);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedTasks(null);
        setModalIsOpen(false);
    };
    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold my-4">Pending Task Reviews</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Worker Name</th>
                            <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Worker Email</th>
                            <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Task Title</th>
                            <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Payable Amount</th>
                            <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedTasks.map(selectedTask => (
                            <tr key={selectedTask.id}>
                                <td className="px-4 py-2 border-b border-gray-200">{selectedTask.worker_name}</td>
                                <td className="px-4 py-2 border-b border-gray-200">{selectedTask.worker_email}</td>
                                <td className="px-4 py-2 border-b border-gray-200">{selectedTask.task_title}</td>
                                <td className="px-4 py-2 border-b border-gray-200">{selectedTask.payable_amount}</td>
                                <td className="px-4 py-2 border-b border-gray-200">
                                    <button
                                        className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                        onClick={() => openModal(selectedTask)}
                                    >
                                        View Submission
                                    </button>
                                    <button
                                        className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                                        onClick={() => handleApprove(selectedTask._id, selectedTask.worker_email, selectedTask.payable_amount)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => handleReject(selectedTask._id)}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedTasks && (
                <div className={`modal ${modalIsOpen ? 'modal-open' : ''}`}>
                    <div className="modal-box">
                        <h2 className="text-xl font-bold">Submission Details</h2>
                        <div>
                            <p>Worker Name: {selectedTasks.worker_name}</p>
                            <p>Worker Email: {selectedTasks.worker_email}</p>
                            <p>Task Title: {selectedTasks.task_title}</p>
                            <p>Payable Amount: {selectedTasks.payable_amount}</p>
                        </div>
                        <div className="modal-action">
                            <button
                                className="btn"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default TaskCreatorHome;
