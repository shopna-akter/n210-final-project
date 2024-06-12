import { Link } from "react-router-dom";
import useUserFetch from "../../Hooks/useUserFetch";
import { FaBell } from "react-icons/fa";


const DashboardNavbar = () => {
    const userData = useUserFetch()
    return (
        <div className="navbar">
            <div className="navbar-start">
                <Link to='/'><img className="h-20 w-80" src="https://i.ibb.co/FJ2Fkt4/Pico-Workers-removebg-preview.png" alt="" /></Link>
            </div>
            <div className="navbar-end">
                <div>
                    <div className="flex gap-1">
                        <h2 className="font-medium text-lg">Coin:{userData?.coin}</h2>
                        <img className="h-8 w-8 rounded-full" src={userData?.profilePicture} alt="" />
                    </div>
                    <div className="flex gap-2">
                        <h2 className="font-medium text-lg">Role:{userData?.role}</h2>
                        <h2 className="font-medium text-lg">Name:{userData?.name}</h2>
                    </div>
                </div>
                <div className="text-7xl mb-5">|</div>
                <div>
                    <FaBell className="ml-8"></FaBell>
                    <h2>Notification</h2>
                </div>
            </div>
        </div>
    );
};

export default DashboardNavbar;
