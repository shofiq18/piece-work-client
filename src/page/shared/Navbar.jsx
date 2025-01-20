
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";

import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success("Successfully logged out!");
            })
            .catch(() => {
                toast.error("Error logging out. Please try again!");
            });
    };

    const loggedInNavOptions = (
        <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/available-coin">Available Coin ({user?.coins || 0})</Link></li>
            <li><Link to="/user-profile">User Profile</Link></li>
        </>
    );

    return (
        <div className="sticky top-0 z-50 py-2 bg-base-100 bg-opacity-90">
            <div className="navbar max-w-7xl mx-auto">
                {/* Navbar Start */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            {user?.email ? loggedInNavOptions : null}
                        </ul>
                    </div>
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-green-600">PieceWork</span>
                        </Link>
                    </div>
                </div>

                {/* Navbar Center */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 mr-20">
                        {user?.email ? loggedInNavOptions : null}
                    </ul>
                    <a
                        href="https://github.com/shofiq18"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="btn btn-outline rounded-full hidden md:inline-block btn-success">
                            Join as Developer
                        </button>
                    </a>
                </div>

                {/* Navbar End */}
                <div className="navbar-end flex items-center space-x-4">
                    {/* If user is logged in, display user avatar and logout button */}
                    {user?.email ? (
                        <>
                            {user.photoURL ? (
                                <div className="relative group">
                                    <img
                                        src={user.photoURL}
                                        alt="User"
                                        className="w-10 h-10 rounded-full border-2 border-white object-cover cursor-pointer"
                                    />
                                    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-2rem] hidden group-hover:block bg-white text-teal-600 text-sm px-3 py-1 rounded-md shadow-lg">
                                        {user.displayName}
                                    </span>
                                </div>
                            ) : (
                                <FaUserCircle className="text-4xl text-gray-600" />
                            )}
                            <button
                                onClick={handleLogOut}
                                className="px-3 py-2 rounded-sm bg-red-500 text-white hover:bg-red-600"
                            >
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Login</button>
                            </Link>
                            <Link to="/register">
                                <button className="bg-green-500 text-white px-4 py-2 hidden md:inline-block rounded-md hover:bg-green-600">Register</button>
                            </Link>
                          
                        </>
                    )}
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Navbar;
