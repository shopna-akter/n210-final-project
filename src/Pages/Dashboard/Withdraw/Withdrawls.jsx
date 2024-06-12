import { useState } from 'react';
import Swal from 'sweetalert2';
import useUserFetch from '../../../Hooks/useUserFetch';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Withdrawls = () => {
    const userData = useUserFetch()
    const totalCoins = userData?.coin
    const workerEmail= userData?.email
    const workerName = userData?.name
    const maxWithdrawableAmount = totalCoins / 20;

    const [coinToWithdraw, setCoinToWithdraw] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [paymentSystem, setPaymentSystem] = useState('');
    const [accountNumber, setAccountNumber] = useState('');

    const axiosSecure = useAxiosSecure();

    const handleCoinChange = (e) => {
        const coins = e.target.value;
        setCoinToWithdraw(coins);
        setWithdrawAmount(coins / 20);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (withdrawAmount > maxWithdrawableAmount) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Requested amount exceeds the maximum withdrawable amount.'
            });
            return;
        }

        const withdrawTime = new Date().toISOString();
        const withdrawalData = {
            workerEmail,
            workerName,
            withdrawCoin: coinToWithdraw,
            withdrawAmount: withdrawAmount.toFixed(2),
            paymentSystem,
            accountNumber,
            withdrawTime,
        };
        axiosSecure.post('https://final-project-server-jade.vercel.app/withdrawals', withdrawalData, {
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
        setCoinToWithdraw('');
        setWithdrawAmount(0);
        setPaymentSystem('');
        setAccountNumber('');
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Withdrawal Form</h2>
            <p>Maximum Withdrawal Amount: ${maxWithdrawableAmount.toFixed(2)}</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Coin To Withdraw</label>
                    <input
                        type="number"
                        name='coinsToWithdraws'
                        value={coinToWithdraw}
                        onChange={handleCoinChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Withdrawal Amount (USD)</label>
                    <input
                        type="number"
                        value={withdrawAmount.toFixed(2)}
                        readOnly
                        className="w-full px-3 py-2 border rounded bg-gray-100"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Select Payment System</label>
                    <select
                        value={paymentSystem}
                        onChange={(e) => setPaymentSystem(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    >
                        <option value="" disabled>Select</option>
                        <option value="Bkash">Bkash</option>
                        <option value="Rocket">Rocket</option>
                        <option value="Nagad">Nagad</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Account Number</label>
                    <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Withdraw
                </button>
            </form>
        </div>
    );
};

export default Withdrawls;
