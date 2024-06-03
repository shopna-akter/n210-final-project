import { Link } from "react-router-dom";
import useUserFetch from "../../Hooks/useUserFetch";


const DashboardNavbar = () => {
    const userData = useUserFetch()
    return (
        <div className="navbar">
                <div className="navbar-start">
                    <Link to='/'><img className="h-20 w-80" src="https://i.ibb.co/cvJBV9S/Pico-Workers.png" alt="" /></Link>
                </div>
            <div className="navbar-end">
                <div className="flex">
                    <h2>{userData?.coin}</h2>
                    <img className="h-8 w-8 rounded-full" src={userData?.profilePicture} alt="" />
                </div>
                <div className="flex">
                    <h2>{userData?.role}</h2>
                    <h2>{userData?.name}</h2>
                </div>
            </div>
        </div>
    );
};

export default DashboardNavbar;
