// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);
//   const navigate = useNavigate();

//   // Fetch tasks from backend
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get("https://piece-work-server.vercel.app/tasks/available");
//         setTasks(response.data);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   // Navigate to task details page
//   const handleViewDetails = (taskId) => {
//     navigate(`/dashboard/tasks/${taskId}`);
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6 ">
//       <h2 className="text-3xl font-bold ">All Task List </h2>

//       <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//         {tasks.map((task) => (
//           <div key={task._id} className="p-4 bg-white shadow-md rounded-lg">
//             <h2 className="text-xl font-bold mb-2">{task.task_title}</h2>
//             <p className="mb-1">
//               <strong>Buyer Name:</strong> {task.buyer_name || "N/A"}
//             </p>
//             <p className="mb-1">
//               <strong>Completion Date:</strong> {new Date(task.completion_date).toLocaleDateString()}
//             </p>
//             <p className="mb-1">
//               <strong>Payable Amount:</strong> ${task.payable_amount}
//             </p>
//             <p className="mb-1">
//               <strong>Required Workers:</strong> {task.required_workers}
//             </p>
//             <button
//               onClick={() => handleViewDetails(task._id)}
//               className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               View Details
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TaskList;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // Original tasks fetched from backend
  const [sortedTasks, setSortedTasks] = useState([]); // Sorted tasks for display
  const [sortOrder, setSortOrder] = useState("ascending"); // Default sort order
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "https://piece-work-server.vercel.app/tasks/available"
        );
        const fetchedTasks = response.data;
        setTasks(fetchedTasks);

        // Sort tasks on the first render
        const initialSortedTasks = [...fetchedTasks].sort(
          (a, b) => a.payable_amount - b.payable_amount
        );
        setSortedTasks(initialSortedTasks); // Default to ascending
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false); // End loading when fetch is complete
      }
    };

    fetchTasks();
  }, []);

  // Handle sorting when a button is clicked
  const handleSort = (order) => {
    setSortOrder(order); // Update the selected sort order

    const sorted = [...tasks].sort((a, b) => {
      if (order === "ascending") {
        return a.payable_amount - b.payable_amount; // Ascending
      } else if (order === "descending") {
        return b.payable_amount - a.payable_amount; // Descending
      }
      return 0; // No sorting
    });

    setSortedTasks(sorted); // Update the sorted tasks state
  };

  // Navigate to task details page
  const handleViewDetails = (taskId) => {
    navigate(`/dashboard/tasks/${taskId}`);
  };

  if (loading) {
    return <div>Loading tasks...</div>; // Show loading message until tasks are fetched
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold">All Task List</h2>

      {/* Sorting Controls */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-semibold">Sort By:</p>
        <div className="flex space-x-2">
          <button
            onClick={() => handleSort("ascending")}
            className={`px-4 py-2 rounded-l bg-blue-500 text-white hover:bg-blue-600 ${
              sortOrder === "ascending" ? "bg-blue-700" : ""
            }`}
          >
            Ascending Price
          </button>
          <button
            onClick={() => handleSort("descending")}
            className={`px-4 py-2 rounded-r bg-blue-500 text-white hover:bg-blue-600 ${
              sortOrder === "descending" ? "bg-blue-700" : ""
            }`}
          >
            Descending Price
          </button>
        </div>
      </div>

      {/* Task Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {sortedTasks.map((task) => (
          <div key={task._id} className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-2">{task.task_title}</h2>
            <p className="mb-1">
              <strong>Buyer Name:</strong> {task.buyer_name || "N/A"}
            </p>
            <p className="mb-1">
              <strong>Completion Date:</strong>{" "}
              {new Date(task.completion_date).toLocaleDateString()}
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
