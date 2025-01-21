import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("https://piece-work-server.vercel.app/tasks/available");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Navigate to task details page
  const handleViewDetails = (taskId) => {
    navigate(`/dashboard/tasks/${taskId}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 ">
      <h2 className="text-3xl font-bold ">All Task List </h2>

      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {tasks.map((task) => (
          <div key={task._id} className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-2">{task.task_title}</h2>
            <p className="mb-1">
              <strong>Buyer Name:</strong> {task.buyer_name || "N/A"}
            </p>
            <p className="mb-1">
              <strong>Completion Date:</strong> {new Date(task.completion_date).toLocaleDateString()}
            </p>
            <p className="mb-1">
              <strong>Payable Amount:</strong> ${task.payable_amount}
            </p>
            <p className="mb-1">
              <strong>Required Workers:</strong> {task.required_workers}
            </p>
            <button
              onClick={() => handleViewDetails(task._id)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
