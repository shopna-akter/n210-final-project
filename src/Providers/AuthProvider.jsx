/* eslint-disable no-unused-vars */
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/firebase.init";

export const AuthContext = createContext(null)
// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
    const auth = getAuth(app)
    const [user , setUser] = useState(null)
    const [loading , setLoading] = useState(true)
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
            // const userEmail =  currentUser?.email || user?.email
            // const loggedUser = { email: userEmail }
            // if (currentUser) {
            //     axios.post('https://assignment-p11-server.vercel.app/jwt', loggedUser, { withCredentials: true })
            //         .then(res => {
            //             console.log('token response', res.data);
            //         })
            //         .catch(error => console.log(error));
            // }
            // else {
            //     axios.post('https://assignment-p11-server.vercel.app/logout', loggedUser , {
            //         withCredentials:true
            //     })
            //     .then(res => {
            //         console.log(res.data);
            //     })
            // }
        })
        return () => {
            return unsubscribe()
        }
    }, [])
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    const authInfo = {
        user,
        loading,
        createUser,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;