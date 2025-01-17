



import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../providers/AuthProvider";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [role, setRole] = useState("Worker"); // Default role
  const [error, setError] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError({
        ...error,
        password:
          "Password must be at least 6 characters long and contain at least one uppercase and one lowercase letter.",
      });
      return;
    }

    try {
      const result = await createUser(email, password);
      const user = result.user;

      await updateUserProfile({ displayName: name, photoURL: photo });

      // Save user to backend
      const newUser = {
        name,
        email,
        role,
        photo,
        coins: role === "Worker" ? 10 : role === "Buyer" ? 50 : 0,
      };
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Failed to save user to the database");
      }

      // Update user context
      setUser(newUser);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Redirect to home page or dashboard
      navigate(`/dashboard/${role.toLowerCase()}-home`);

      // Reset form
      form.reset();
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Registration failed. Please try again.",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      const newUser = {
        name: user.displayName,
        email: user.email,
        role: "Worker", // Default role for Google sign-in
        photo: user.photoURL,
        coins: 10,
      };

      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Failed to save user to the database");
      }

      // Update user context
      setUser(newUser);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Google sign-in successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Redirect to dashboard
      navigate(`/dashboard/worker-home`);
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Google sign-in failed. Please try again.",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="photo"
              className="block text-gray-700 font-medium mb-2"
            >
              Photo URL
            </label>
            <input
              type="text"
              id="photo"
              name="photo"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
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
            {error.password && (
              <p className="text-red-500 text-sm mt-2">{error.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-gray-700 font-medium mb-2"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Worker">Worker</option>
              <option value="Buyer">Buyer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-4">{error.message}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition"
          >
            Register
          </button>
        </form>
        <div className="mt-6 flex items-center justify-between">
          <span className="block border-t w-full"></span>
          <span className="px-4 text-gray-500">OR</span>
          <span className="block border-t w-full"></span>
        </div>
        <button
          onClick={handleGoogleRegister}
          className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg flex items-center justify-center space-x-2"
        >
          <FcGoogle className="w-5 h-5" />
          <span>Sign up with Google</span>
        </button>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link className="text-blue-500 hover:underline" to="/login">
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;




















