import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import Reveal from "../animation/Reveal"; // Assuming Reveal is your animation wrapper
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const Login = () => {
    const { signIn, signInWithGoogle, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState({});

    // Google Login Handler
    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then((result) => {
                const user = result.user;
                setUser(user);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Google sign-in successful",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/");
            })
            .catch((err) => {
                console.error("Google sign-in error:", err.message);
                setError({
                    ...error,
                    google: "Failed to sign in with Google. Please try again.",
                });
            });
    };

    // Form Login Handler
    const handleLogin = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get("email");
        const password = form.get("password");

        setError({}); // Clear previous errors

        try {
            const result = await signIn(email, password);
            const user = result.user;
            setUser(user);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Login successful",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate("/");
        } catch (err) {
            console.error("Login error:", err.message);
            setError({ ...error, general: "Invalid email or password. Please try again." });
        }
    };

    return (
        <Reveal>
            <div>
                <div
                    data-aos="fade-up"
                    className="flex justify-center items-center my-12"
                >
                    <div className="hero-content flex-col">
                        <div className="text-center lg:text-left">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                                Log in to your account
                            </h1>
                        </div>
                        <div className="card bg-white lg:w-[500px] py-6 mt-6 shadow-2xl">
                            <form onSubmit={handleLogin} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        name="email"
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        name="password"
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                                {error.general && (
                                    <p className="text-center text-red-500 mt-2">{error.general}</p>
                                )}
                                <div className="form-control mt-6">
                                    <button className="btn bg-blue-500 text-white hover:bg-gray-700">
                                        Log In
                                    </button>
                                </div>
                            </form>
                            <p className="text-center mt-4">or</p>
                            <div className="form-control mt-4 px-8">
                                <button
                                    onClick={handleGoogleLogin}
                                    className="btn bg-blue-500 text-white hover:bg-gray-700"
                                >
                                    <span className="mr-4 text-xl">
                                        <FcGoogle />
                                    </span>
                                    Log in with Google
                                </button>
                            </div>
                            <p className="mt-4 text-base text-center text-gray-600">
                                Don't have an account?{" "}
                                <Link
                                    className="text-green-500 font-bold border-b"
                                    to="/register"
                                >
                                    Register Now
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Reveal>
    );
};

export default Login;
