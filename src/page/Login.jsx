

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const Login = () => {
  const { signIn, signInWithGoogle, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;

        // Fetch user data from the backend
        fetch(`http://localhost:5000/users/${user.email}`)
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              setUser(data);
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Google sign-in successful",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate(`/dashboard/${data.role.toLowerCase()}-home`);
            } else {
              setError("User data not found. Please try again.");
            }
          })
          .catch((err) => {
            console.error("Error fetching user data:", err);
            setError("Failed to fetch user data. Please try again.");
          });
      })
      .catch((err) => {
        console.error("Google sign-in error:", err.message);
        setError("Failed to sign in with Google. Please try again.");
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setError(""); // Clear previous errors
    try {
      const result = await signIn(email, password);
      const user = result.user;

      // Fetch user data from the backend
      const response = await fetch(`http://localhost:5000/users/${user.email}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`/dashboard/${data.role.toLowerCase()}-home`);
      } else {
        setError("Failed to fetch user data. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err.message);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-4">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>
        <div className="mt-6 flex items-center justify-between">
          <span className="block border-t w-full"></span>
          <span className="px-4 text-gray-500">OR</span>
          <span className="block border-t w-full"></span>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg flex items-center justify-center space-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="w-5 h-5"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.15 0 5.95 1.18 8.15 3.12l6.1-6.1C34.15 3.15 29.3 1 24 1 14.68 1 6.82 6.64 3.18 14.34l7.09 5.5C12.18 13.86 17.64 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.45 24.5c0-1.5-.12-2.96-.35-4.37H24v8.24h12.8c-.58 3.12-2.26 5.77-4.8 7.6l7.09 5.5c4.15-3.84 6.45-9.5 6.45-16.97z"
            />
            <path
              fill="#FBBC05"
              d="M10.27 28.03c-.73-2.12-.73-4.38 0-6.5l-7.1-5.5c-3.3 6.43-3.3 14.07 0 20.5l7.1-5.5z"
            />
            <path
              fill="#34A853"
              d="M24 46c5.4 0 10.02-1.8 13.35-4.87l-7.09-5.5c-2.07 1.4-4.74 2.24-7.64 2.24-6.36 0-11.83-4.36-13.73-10.5l-7.09 5.5C6.82 41.36 14.68 46 24 46z"
            />
            <path fill="none" d="M0 0h48v48H0z" />
          </svg>
          <span>Sign in with Google</span>
        </button>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register now
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;