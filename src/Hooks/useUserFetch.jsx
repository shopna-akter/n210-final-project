import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useUserFetch = () => {
    const { user } = useContext(AuthContext)
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            })
    }, [])
    const userData = user ? users.find(userData => userData.email == user.email) : null
    console.log(userData);
    if(userData){
        return userData
    }
};

export default useUserFetch;