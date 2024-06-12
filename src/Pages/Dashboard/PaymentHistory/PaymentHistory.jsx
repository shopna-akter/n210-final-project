import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUserFetch from "../../../Hooks/useUserFetch";

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const userData = useUserFetch();
    const [userPayments, setUserPayments] = useState([]);

    useEffect(() => {
        axiosSecure.get('https://final-project-server-jade.vercel.app/Payment')
            .then(res => {
                const userPayments = res.data.filter(userPayment => userPayment.userId === userData?._id);
                setUserPayments(userPayments);
                console.log(userPayments);
            });
    }, []);

    console.log(userPayments);

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Payment Date</th>
                            <th>Coins</th>
                            <th>Payment Method</th>
                            <th>User Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userPayments.map(userPayment => (
                            <tr key={userPayment._id}>
                                <td>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </td>
                                <td className="font-bold">{new Date(userPayment.paymentDate).toLocaleDateString()}</td>
                                <td className="font-bold">{userPayment.coins}</td>
                                <td className="font-bold">{userPayment.payment_method}</td>
                                <td className="font-bold">{userData?.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
