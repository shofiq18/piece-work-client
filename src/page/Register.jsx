import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import Reveal from "../animation/Reveal";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const Register = () => {
    const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState({});

    const handleGoogleRegister = () => {
        signInWithGoogle()
            .then((result) => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Google sign-in successful!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/");
            })
            .catch(() => {
                setError({
                    ...error,
                    google: "Failed to sign in with Google. Please try again.",
                });
            });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setError({
                ...error,
                password: "Password must be at least 6 characters long and contain at least one uppercase and one lowercase letter.",
            });
            return;
        }

        setError({}); // Clear errors before attempting registration

        try {
            const result = await createUser(email, password);
            const user = result.user;

            // Update user profile with name and photo URL
            await updateUserProfile({
                displayName: name,
                photoURL: photo,
            });

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registration successful!",
                showConfirmButton: false,
                timer: 1500,
            });

            form.reset(); // Reset the form fields
            navigate("/");
        } catch (err) {
            console.error("Registration error:", err.message);
            setError({ ...error, general: "Registration failed. Please try again." });
        }
    };

    return (
        <Reveal>
            <div className="flex justify-center items-center my-12">
                <div className="hero-content flex-col">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold">Register now!</h1>
                    </div>
                    <div className="card bg-white lg:w-[500px] py-6 mt-6 shadow-2xl">
                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input
                                    type="text"
                                    name="photo"
                                    placeholder="Enter your photo URL"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
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
                                    name="password"
                                    placeholder="Enter your password"
                                    className="input input-bordered"
                                    required
                                />
                                {error.password && (
                                    <p className="text-red-500 mt-1">{error.password}</p>
                                )}
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-blue-500 text-white hover:bg-gray-700">
                                    Register
                                </button>
                            </div>
                        </form>
                        {error.general && (
                            <p className="text-center text-red-500 mt-4">{error.general}</p>
                        )}
                        <p className="text-center mt-4">or</p>
                        <div className="form-control mt-4 px-8">
                            <button
                                onClick={handleGoogleRegister}
                                className="btn bg-blue-500 text-white hover:bg-gray-700"
                            >
                                <span className="mr-4 text-xl">
                                    <FcGoogle />
                                </span>
                                Sign in with Google
                            </button>
                        </div>
                        <p className="mt-4 text-base text-center text-gray-600">
                            Already have an account?{" "}
                            <Link className="text-green-500 font-bold" to="/login">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </Reveal>
    );
};

export default Register;
