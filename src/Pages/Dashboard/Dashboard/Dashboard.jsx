import { FaBriefcase, FaCoins, FaDollarSign, FaEnvelope, FaHome, FaList, FaShoppingCart, FaUser } from "react-icons/fa";
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
        } if(userData?.role === 'admin') {
            setUserRole('admin');
        }
    }, [userData]);
    return (
        <div className="flex">
            <div className="min-h-screen bg-indigo-400">
                <ul className="menu p-4">
                    {
                        userRole === 'TaskCreator' ? <>
                            <li>
                                <NavLink to="/Dashboard/addTasks">
                                    <FaBriefcase></FaBriefcase>
                                    Add Tasks</NavLink>
                            </li>
                            <li>
                                <NavLink to="/Dashboard/myTasks">
                                    <FaList></FaList>
                                    Manage Tasks</NavLink>
                            </li>
                            <li>
                                <NavLink to="/Dashboard/PurchaseCoin">
                                    <FaCoins></FaCoins>
                                    Purchase Coin</NavLink>
                            </li>
                            <li>
                                <NavLink to="/Dashboard/paymentHistory">
                                    <FaShoppingCart></FaShoppingCart>
                                    Payment history</NavLink>
                            </li>
                        </>
                            : userRole === 'Worker' ?
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
                                        <NavLink to="/Dashboard/withdrawls">
                                            <FaDollarSign></FaDollarSign>
                                            Withdrawls</NavLink>
                                    </li>
                                </>
                                :
                                <>
                                    <li>
                                        <NavLink to="/Dashboard/alluser">
                                            <FaDollarSign></FaDollarSign>
                                            All User</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/Dashboard/manageTasks'>
                                            <FaUser></FaUser>
                                            Manage Tasks
                                        </NavLink>
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