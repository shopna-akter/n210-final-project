import { useContext, useEffect, useState } from "react";
import { Link, NavLink} from "react-router-dom"
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import useUserFetch from "../../Hooks/useUserFetch";
import { Tooltip } from "react-tooltip";
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [userPhoto, setUserPhoto] = useState('https://i.ibb.co/yWR8BCV/user.png');
    const userData = useUserFetch()
    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'light';
    };
    const [theme, setTheme] = useState(getInitialTheme);
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
    useEffect(() => {
        if (user && user.photoURL) {
            setUserPhoto(user.photoURL);
        } else {
            setUserPhoto('https://i.ibb.co/yWR8BCV/user.png');
        }
    }, [user]);
    const handleSignOut = () => {
        Swal.fire({
            title: "Are you sure to log out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, do it!'
        })
            .then(result => {
                if (result.isConfirmed) {
                    logOut()
                        .then()
                        .catch()
                }
            })
    }
    const links = <>
        <NavLink to='/' className='btn bg-indigo-400 hover:bg-indigo-500 btn-ghost mr-2'>Home</NavLink>
        <NavLink to='/Dashboard' className='btn bg-indigo-400 hover:bg-indigo-500 btn-ghost mr-2'>Dashboard</NavLink>
        {
            user ?
                <button onClick={handleSignOut} className="btn bg-orange-400 hover:bg-orange-600">Sign Out</button>
                :
                <div>
                    <Link to='/Login' className="btn mr-2 md:hidden">Login</Link>
                    <Link to='/Register' className="btn md:hidden">Register</Link>
                </div>
        }

    </>
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown z-30">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    <Link to='/'><img className="h-20 w-80" src="https://i.ibb.co/FJ2Fkt4/Pico-Workers-removebg-preview.png" alt="" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end gap-4">
                    <label className="swap  required:w-8 required:h-8">
                        <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
                        <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                        <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                    </label>
                    <Tooltip id="my-tooltip" />
                    {
                        user ?
                            <div className="flex gap-1 ">
                                <img
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content={user ? (user.displayName || 'No user photo available') : 'No user  available'}
                                    data-tooltip-place="left" className='h-8 w-8 rounded-full mt-2' src={userPhoto} alt="" />
                                <h4 className="flex"><img className="h-10 w-14" src="https://i.ibb.co/dDwC0Jd/download.jpg" alt="" /><span className="font-medium text-lg pt-1">{userData?.coin}</span></h4>
                            </div>
                            :
                            <div>
                                <Link to='/Login' className="btn mr-2 hidden md:inline-flex">Login</Link>
                                <Link to='/Register' className="btn hidden md:inline-flex">Register</Link>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;