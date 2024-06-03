import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../Firebase/firebase.init";
import useAxiosPublic from "./useAxiosPublic";

const SocialLogin = () => {
    const axiosPublic = useAxiosPublic();

    const handleSignInWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        const auth = getAuth(app);

        signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user;
                const RegisteredData = {
                    name: user?.displayName,
                    email: user?.email,
                    profilePicture: user?.photoURL,
                    role: "Worker",
                    coin: 10
                };

                axiosPublic.post('/users', RegisteredData)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Success!",
                                text: "Login successful with Google",
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                title: "Info",
                                text: "User already exists",
                                icon: "info"
                            });
                        }
                    })
                    .catch(apiError => {
                        console.error('Error saving user to database:', apiError);
                        Swal.fire({
                            title: "Registration Failed!",
                            text: "Could not save user to the database.",
                            icon: "error"
                        });
                    });
            })
            .catch(error => {
                console.log('Error during sign in:', error);
                Swal.fire({
                    title: "Login Failed with Google!",
                    text: error.message,
                    icon: "error"
                });
            });
    };

    return (
        <div>
            <div className="divider">OR</div>
            <button onClick={handleSignInWithGoogle} className="flex btn mb-2 w-full bg-yellow-300 hover:bg-orange-400">
                Sign in with <FaGoogle />
            </button>
        </div>
    );
};

export default SocialLogin;
