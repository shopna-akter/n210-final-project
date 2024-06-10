import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUserFetch from "../../../Hooks/useUserFetch";

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure()
    const userData = useUserFetch()
    const [userPayments , setUserPayment] = useState([])
    useEffect(()=>{
        axiosSecure.get('http://localhost:5000/Payment')
        .then(res=>{
            const userPayments = res.data.find(userPayment=> userPayment.Id === userData._id);
            setUserPayment(userPayments);
        })
    },[])
    console.log(userPayments);
    return (
        <div>
            
        </div>
    );
};

export default PaymentHistory;