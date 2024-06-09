import {FaBriefcase, FaCoins, FaDollarSign, FaEnvelope, FaHome, FaList,FaShoppingCart } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useUserFetch from "../../../Hooks/useUserFetch";
import { useEffect, useState } from "react";
import Footer from "../../../Shared/Footer/Footer"
import DashboardNavbar from "../../../Shared/DashboardNavbar/DashboardNavbar";

const Dashboard = () => {
    const [userRole, setUserRole] = useState('Worker')
    const userData = useUserFetch()
    useEffect(() => {
        if (userData?.role === 'TaskCreator') {
            setUserRole('TaskCreator');
        } else {
            setUserRole('Worker');
        }
    }, [userData]);
    return (
        <div className="flex">
            <div className="min-h-screen bg-indigo-400">
                <ul className="menu p-4">
                    {
                        userRole==='TaskCreator' ? <>
                            <li>
                                <NavLink to="/Dashboard/addTasks">
                                    <FaBriefcase></FaBriefcase>
                                    Add Tasks</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageTasks">
                                    <FaList></FaList>
                                    Manage Tasks</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/purchaseCoin">
                                    <FaCoins></FaCoins>
                                    Purchase Coin</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/paymentHistory">
                                    <FaShoppingCart></FaShoppingCart>
                                    Payment history</NavLink>
                            </li>
                        </>
                            :
                            <>
                                <li>
                                    <NavLink to="/Dashboard/taskList">
                                        <FaBriefcase></FaBriefcase>
                                        Task List</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/mySubmissions">
                                        <FaEnvelope></FaEnvelope>
                                        My Submissions</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/withdrawls">
                                        <FaDollarSign></FaDollarSign>
                                        Withdrawls</NavLink>
                                </li>
                            </>
                    }
                    <div className="divider"></div>
                    <li>
                        <NavLink to={`/Dashboard/${userData?.role}Home`}>
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-8">
                <DashboardNavbar></DashboardNavbar>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Dashboard;