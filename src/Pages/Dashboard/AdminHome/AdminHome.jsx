import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
const AdminHome = () => {
    const [withdrawals, setWithdrawals] = useState([]);
    const axiosSecure = useAxiosSecure();
    axiosSecure.get('http://localhost:5000/withdrawals')
        .then(res => {
            setWithdrawals(res.data)
        })
    const handlePaymentSuccess = (withdrawalId, withdrawCoin, userEmail) => {
        const deleteInfo = {
            withdrawCoin,
            withdrawalId,
            userEmail
        }
        axiosSecure.delete(`http://localhost:5000/withdrawals/${withdrawalId}`, {data:deleteInfo})
            .then(res => {
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "payment success!",
                        text: "user withdrawl has been successful.",
                        icon: "success"
                    });
                }
            })
    }
    return (
        <div className="max-w-5xl mx-auto p-4 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Withdrawal Requests</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Worker Name</th>
                        <th className="py-2">Withdraw Coin</th>
                        <th className="py-2">Withdraw Amount (USD)</th>
                        <th className="py-2">Payment Number</th>
                        <th className="py-2">Payment System</th>
                        <th className="py-2">Withdraw Time</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {withdrawals.map((withdrawal) => (
                        <tr key={withdrawal._id}>
                            <td className="border px-4 py-2">{withdrawal.workerName}</td>
                            <td className="border px-4 py-2">{withdrawal.withdrawCoin}</td>
                            <td className="border px-4 py-2">{withdrawal.withdrawAmount}</td>
                            <td className="border px-4 py-2">{withdrawal.accountNumber}</td>
                            <td className="border px-4 py-2">{withdrawal.paymentSystem}</td>
                            <td className="border px-4 py-2">{new Date(withdrawal.withdrawTime).toLocaleString()}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handlePaymentSuccess(withdrawal._id, withdrawal.withdrawCoin, withdrawal.workerEmail)}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Payment Success
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminHome;
