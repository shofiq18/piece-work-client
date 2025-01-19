
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [task, setTask] = useState({
    task_title: "",
    task_detail: "",
    required_workers: "",
    payable_amount: "",
    completion_date: "",
    submission_info: "",
    task_image_url: "",
  });

  const image_hosting_key = import.meta.env.VITE_IMAGE_KEY;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${image_hosting_key}`,
        formData
      );
      setTask((prevTask) => ({
        ...prevTask,
        task_image_url: response.data.data.display_url,
      }));
      Swal.fire({
        icon: "success",
        title: "Image uploaded successfully!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error uploading image:", error.response || error);
      Swal.fire({
        icon: "error",
        title: "Image upload failed",
        text: "Please try again.",
      });
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    const {
      task_title,
      required_workers,
      payable_amount,
      completion_date,
      task_detail,
    } = task;

    // Convert required_workers and payable_amount to numbers
    const totalPayableAmount =
      parseInt(required_workers, 10) * parseInt(payable_amount, 10);

    // Check if the user has enough coins
    if (user.coins < totalPayableAmount) {
      Swal.fire({
        icon: "error",
        title: "Not enough coins!",
        text: "Please purchase more coins to add this task.",
      }).then(() => {
        navigate("/dashboard/purchase-coins");
      });
      return;
    }

    const taskToSend = {
      ...task,
      required_workers: parseInt(required_workers, 10), // Ensure number type
      payable_amount: parseInt(payable_amount, 10), // Ensure number type
      email: user.email, // Include user email
    };

    // Optimistically update the user state
    const updatedUser = { ...user, coins: user.coins - totalPayableAmount };
    setUser(updatedUser);

    try {
      const taskResponse = await axios.post("http://localhost:5000/tasks", taskToSend);
      if (taskResponse.status === 201) {
        const userResponse = await axios.patch(
          "http://localhost:5000/users/deduct-coins",
          {
            email: user.email,
            amount: totalPayableAmount,
          }
        );

        if (userResponse.status === 200) {
          const updatedUserData = await axios.get(
            `http://localhost:5000/users/${user.email}`
          );
          setUser(updatedUserData.data);
          Swal.fire({
            icon: "success",
            title: "Task added successfully!",
            timer: 2000,
            showConfirmButton: false,
          });
          navigate("/dashboard/my-tasks");
        }
      }
    } catch (error) {
      console.error("Error adding task:", error);
      setUser(user); // Revert to original user state on failure
      Swal.fire({
        icon: "error",
        title: "Failed to add task",
        text: "Please try again.",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
      <form onSubmit={handleAddTask}>
        <div className="mb-4">
          <label className="block text-gray-700">Task Title</label>
          <input
            type="text"
            name="task_title"
            value={task.task_title}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Task Detail</label>
          <textarea
            name="task_detail"
            value={task.task_detail}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border rounded-md"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Required Workers</label>
          <input
            type="number"
            name="required_workers"
            value={task.required_workers}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Payable Amount per Worker</label>
          <input
            type="number"
            name="payable_amount"
            value={task.payable_amount}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Completion Date</label>
          <input
            type="date"
            name="completion_date"
            value={task.completion_date}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Submission Info</label>
          <textarea
            name="submission_info"
            value={task.submission_info}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border rounded-md"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Upload Task Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full mt-2 p-2 border rounded-md"
          />
          {task.task_image_url && (
            <img
              src={task.task_image_url}
              alt="Task Preview"
              className="mt-4 w-32 h-32 object-cover rounded-md"
            />
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
