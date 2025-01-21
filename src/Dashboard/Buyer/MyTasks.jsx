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
        const response = await axios.get(`https://piece-work-server.vercel.app/tasks/user/${user.email}`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [user.email]);

  // Handle task update
  const handleUpdate = async () => {
    try {
      await axios.patch(`https://piece-work-server.vercel.app/tasks/${selectedTask._id}`, updateForm);
      alert("Task updated successfully!");
      setSelectedTask(null);
      setUpdateForm({ task_title: "", task_detail: "", submission_info: "" });
      
      // Fetch updated user data and update the context
      const response = await axios.get(`https://piece-work-server.vercel.app/users/${user.email}`);
      setUser(response.data); // Update the user data in context

      // Refresh tasks
      const tasksResponse = await axios.get(`https://piece-work-server.vercel.app/tasks/user/${user.email}`);
      setTasks(tasksResponse.data);
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task");
    }
  };

  // Handle task delete
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`https://piece-work-server.vercel.app/tasks/${taskId}`);
      alert("Task deleted successfully!");
      setTasks(tasks.filter((task) => task._id !== taskId));

      // Fetch updated user data and update the context
      const response = await axios.get(`https://piece-work-server.vercel.app/users/${user.email}`);
      setUser(response.data); // Update the user data in context
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">My Tasks</h2>
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Details</th>
            <th className="border px-4 py-2">Workers</th>
            <th className="border px-4 py-2">Payable</th>
            <th className="border px-4 py-2">Completion Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td className="border px-4 py-2">{task.task_title}</td>
              <td className="border px-4 py-2">{task.task_detail}</td>
              <td className="border px-4 py-2">{task.required_workers}</td>
              <td className="border px-4 py-2">${task.payable_amount}</td>
              <td className="border px-4 py-2">{new Date(task.completion_date).toLocaleDateString()}</td>
              <td className="border px-4 py-2">
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

      {/* Update Task Modal */}
      {selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-bold mb-4">Update Task</h3>
            <input
              type="text"
              value={updateForm.task_title}
              onChange={(e) => setUpdateForm({ ...updateForm, task_title: e.target.value })}
              placeholder="Task Title"
              className="w-full mb-2 p-2 border rounded"
            />
            <textarea
              value={updateForm.task_detail}
              onChange={(e) => setUpdateForm({ ...updateForm, task_detail: e.target.value })}
              placeholder="Task Details"
              className="w-full mb-2 p-2 border rounded"
            ></textarea>
            <textarea
              value={updateForm.submission_info}
              onChange={(e) => setUpdateForm({ ...updateForm, submission_info: e.target.value })}
              placeholder="Submission Info"
              className="w-full mb-2 p-2 border rounded"
            ></textarea>
            <div className="flex justify-end">
              <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
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
