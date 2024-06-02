import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import { getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../Firebase/firebase.init";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import useAxiosPubic from "../../Hooks/axiosPubic";

const Register = () => {
    const { createUser } = useContext(AuthContext)
    const axiosPublic = useAxiosPubic()
    const handleFormSubmit = e => {
        e.preventDefault();
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const profilePicture = form.profilePicture.value
        const password = form.password.value
        const role = form.role.value
        const RegisteredData = { name, email, profilePicture, password, role, }
        console.log(RegisteredData);
        createUser(email, password)
            .then(res => {
                console.log(res.user);
                axiosPublic.post('/users',RegisteredData)
                .then(res =>{
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: "Success!",
                            text: "Registration successful",
                            icon: "success"
                        })
                    }
                })
            })
            .catch(err => {
                console.error(err);
                Swal.fire({
                    title: "Registration Failed!",
                    text: `${err}`,
                    icon: "error"
                })
            })
    }
    const googleProvider = new GoogleAuthProvider()
    const auth = getAuth(app)
    const handleSignInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                console.log(result);
                Swal.fire({
                    title: "Success!",
                    text: "Login successful with Google",
                    icon: "success"
                })
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    title: "Login Failed with Google!",
                    text: `${error.message}`,
                    icon: "error"
                })
            })
    }
    return (
        <form onSubmit={handleFormSubmit} className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
            <div className="text-center mb-4">
                <h2 className="font-bold text-3xl">Register</h2>
            </div>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="profilePicture" className="block text-gray-700">Profile Picture URL:</label>
                <input
                    type="url"
                    id="profilePicture"
                    name="profilePicture"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="role" className="block text-gray-700">Role:</label>
                <select
                    id="role"
                    name="role"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                    required
                >
                    <option value="Worker">Worker</option>
                    <option value="TaskCreator">TaskCreator</option>
                </select>
            </div>
            <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
                Submit
            </button>
            <div className="divider">OR</div>
            <button onClick={handleSignInWithGoogle} className="flex btn mb-2 w-full bg-yellow-300 hover:bg-orange-400">Sign in with <FaGoogle></FaGoogle></button>
        </form>
    )
};

export default Register;