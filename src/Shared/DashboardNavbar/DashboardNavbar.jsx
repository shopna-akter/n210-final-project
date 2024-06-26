import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import useUserFetch from "../../Hooks/useUserFetch";
import { AuthContext } from "../../Providers/AuthProvider";

const DashboardNavbar = () => {
    const userData = useUserFetch();
    const { user } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://final-project-server-jade.vercel.app/notification/${user.email}`)
                .then(res => res.json())
                .then(data => setNotifications(data));
        }
    }, [user]);

    return (
        <div className="navbar bg-white shadow-lg p-4 flex justify-between items-center">
            <div className="navbar-start">
                <Link to='/'>
                    <img className="h-20 w-80" src="https://i.ibb.co/FJ2Fkt4/Pico-Workers-removebg-preview.png" alt="Logo" />
                </Link>
            </div>
            <div className="navbar-end flex items-center gap-8">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="font-medium text-lg">Coin: {userData?.coin}</h2>
                        <img className="h-8 w-8 rounded-full" src={userData?.profilePicture} alt="Profile" />
                    </div>
                    <div className="flex items-center gap-2">
                        <h2 className="font-medium text-lg">Role: {userData?.role}</h2>
                        <h2 className="font-medium text-lg">Name: {userData?.name}</h2>
                    </div>
                </div>
                <div className="text-4xl">|</div>
                <div className="relative">
                    <button onClick={() => document.getElementById('my_modal_2').showModal()} className="notification-icon flex items-center">
                        <FaBell className="ml-8 text-2xl" />
                        <h2 className="ml-2">Notification</h2>
                    </button>
                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box">
                            <h2 className="text-lg font-semibold mb-2">Notifications</h2>
                            {notifications.length === 0 ? (
                                <p>No notifications</p>
                            ) : (
                                <ul>
                                    {notifications.map((notification) => (
                                        <li key={notification._id} className="border-b py-2">
                                            <p>{notification.message}</p>
                                            <span className="text-xs text-gray-500">{new Date(notification.time).toLocaleString()}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
            </div>
        </div>
    );
};

export default DashboardNavbar;
