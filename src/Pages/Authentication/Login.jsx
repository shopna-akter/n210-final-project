import { useContext } from "react";
import { Link } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import groovyWalkAnimation from "../../../Animation - 1715749319003.json";
import { app } from "../../Firebase/firebase.init";
import { AuthContext } from "../../Providers/AuthProvider";
import Lottie from "lottie-react";
// import { Helmet } from "react-helmet-async";
const Login = () => {
    // const navigate = useNavigate()
    const { SignIn } = useContext(AuthContext)
    const googleProvider = new GoogleAuthProvider()
    const auth = getAuth(app)
    const handleLogin = e => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        SignIn(email, password)
            .then(result => {
                console.log(result);
                Swal.fire({
                    title: "Success!",
                    text: "Login successful",
                    icon: "success"
                })
                // navigate(location?.state ? location.state : '/')
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    title: "Login Failed!",
                    text: `${error.message}`,
                    icon: "error"
                })
            })
    }
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
        <div>
            <div className="hero min-h-screen ">
                {/* <Helmet>
                    <title>|| Login</title>
                </Helmet> */}
                <div className="hero-content flex-col lg:flex-row">
                    <Lottie
                        animationData={groovyWalkAnimation}
                        aria-aria-labelledby="use lottie animation"
                    />
                    {/* <img src="https://i.ibb.co/5TmJhGm/Banner-31a.jpg" className="md:h-[400px] h-[450px] w-[450px] md:w-[600px]" alt="" /> */}
                    <div className="card shrink-0 text-center w-full max-w-sm shadow-2xl bg-base-100">
                        <h2 className="text-4xl font-bold mt-2">Login now to PicoWorkers!!</h2>
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="rounded-md relative w-full px-3 py-3 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                />
                                {/* <button
                                    type="button"
                                    className="absolute inset-y-0 right-4 -top-52 pr-3 flex items-center"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button> */}
                                <div className="form-control mt-6">
                                    <button className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">Login</button>
                                </div>
                                <div className="divider">OR</div>
                                <button onClick={handleSignInWithGoogle} className="flex btn mb-2 bg-yellow-300 hover:bg-orange-400">Sign in with <FaGoogle></FaGoogle></button>
                                {/* <button onClick={handleSignInWithGithub} className="flex btn btn-neutral">Sign in with <FaGithub></FaGithub></button> */}
                                <h2>Dont have an account ? <Link to='/Register' className="btn-link">Register</Link></h2>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;