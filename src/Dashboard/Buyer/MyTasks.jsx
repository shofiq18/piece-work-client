import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";

const MyTasks = () => {
  const { user, setUser } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    task_title: "",
    task_detail: "",
    submission_info: "",
  });

  // Fetch tasks added by the user
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `https://piece-work-server.vercel.app/tasks/user/${user.email}`
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        alert("Failed to load tasks.");
      }
    };

    fetchTasks();
  }, [user.email]);

  // Handle task update
  const handleUpdate = async () => {
    try {
      await axios.patch(
        `https://piece-work-server.vercel.app/tasks/${selectedTask._id}`,
        updateForm
      );
      alert("Task updated successfully!");
      setSelectedTask(null);

      // Refresh tasks and update user data
      const [tasksResponse, userResponse] = await Promise.all([
        axios.get(
          `https://piece-work-server.vercel.app/tasks/user/${user.email}`
        ),
        axios.get(`https://piece-work-server.vercel.app/users/${user.email}`),
      ]);
      setTasks(tasksResponse.data);
      setUser(userResponse.data);
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task.");
    }
  };

  // Handle task delete
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`https://piece-work-server.vercel.app/tasks/${taskId}`);
      alert("Task deleted successfully!");
      setTasks(tasks.filter((task) => task._id !== taskId));

      // Update user data
      const userResponse = await axios.get(
        `https://piece-work-server.vercel.app/users/${user.email}`
      );
      setUser(userResponse.data);
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Tasks</h2>
      {tasks.length > 0 ? (
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Details</th>
              <th className="px-4 py-2">Workers</th>
              <th className="px-4 py-2">Payable</th>
              <th className="px-4 py-2">Completion Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{task.task_title}</td>
                <td className="px-4 py-2">{task.task_detail}</td>
                <td className="px-4 py-2">{task.required_workers}</td>
                <td className="px-4 py-2">${task.payable_amount}</td>
                <td className="px-4 py-2">
                  {new Date(task.completion_date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => {
                      setSelectedTask(task);
                      setUpdateForm({
                        task_title: task.task_title,
                        task_detail: task.task_detail,
                        submission_info: task.submission_info,
                      });
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center mt-12">
          <p className="text-lg font-medium text-gray-700">
            No tasks found. Create a task to get started!
          </p>
        </div>
      )}

      {/* Update Task Modal */}
      {selectedTask && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setSelectedTask(null)}
        >
          <div
            className="bg-white p-6 rounded shadow-md w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">Update Task</h3>
            <input
              type="text"
              value={updateForm.task_title}
              onChange={(e) =>
                setUpdateForm({ ...updateForm, task_title: e.target.value })
              }
              placeholder="Task Title"
              className="w-full mb-2 p-2 border rounded"
            />
            <textarea
              value={updateForm.task_detail}
              onChange={(e) =>
                setUpdateForm({ ...updateForm, task_detail: e.target.value })
              }
              placeholder="Task Details"
              className="w-full mb-2 p-2 border rounded"
            ></textarea>
            <textarea
              value={updateForm.submission_info}
              onChange={(e) =>
                setUpdateForm({ ...updateForm, submission_info: e.target.value })
              }
              placeholder="Submission Info"
              className="w-full mb-2 p-2 border rounded"
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => setSelectedTask(null)}
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTasks;
