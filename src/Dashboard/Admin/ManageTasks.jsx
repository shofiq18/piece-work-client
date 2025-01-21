

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const ManageTasks = () => {
  const { user, setUser } = useContext(AuthContext); // Access user and setUser from AuthContext
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch tasks from the backend
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://piece-work-server.vercel.app/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      Swal.fire("Error", "Failed to fetch tasks. Please try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Delete task and update user state
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This task will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`https://piece-work-server.vercel.app/tasks/${id}`);
          if (response.status === 200) {
            // Update UI
            const updatedTasks = tasks.filter((task) => task._id !== id);
            setTasks(updatedTasks);

            // Deduct coins (if necessary) and update user state
            const updatedUser = {
              ...user,
              coins: user.coins + response.data.refundAmount, // Assuming backend sends `refundAmount`
            };
            setUser(updatedUser); // Update global user state

            Swal.fire("Deleted!", response.data.message, "success");
          } else {
            Swal.fire("Error", "Failed to delete task. Please try again.", "error");
          }
        } catch (error) {
          console.error("Error deleting task:", error);
          Swal.fire("Error", "Failed to delete task. Please try again.", "error");
        }
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Tasks</h1>
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Details</th>
                <th className="border border-gray-300 px-4 py-2">Workers</th>
                <th className="border border-gray-300 px-4 py-2">Pay</th>
                <th className="border border-gray-300 px-4 py-2">Deadline</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td className="border border-gray-300 px-4 py-2">{task.task_title}</td>
                  <td className="border border-gray-300 px-4 py-2">{task.task_detail}</td>
                  <td className="border border-gray-300 px-4 py-2">{task.required_workers}</td>
                  <td className="border border-gray-300 px-4 py-2">{task.payable_amount}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(task.completion_date).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default ManageTasks;
