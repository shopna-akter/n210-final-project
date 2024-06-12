import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useUserFetch from "../Hooks/useUserFetch";



// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const userData = useUserFetch()
    if (loading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && userData?.role === 'admin') {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default AdminRoute;