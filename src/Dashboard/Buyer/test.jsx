// import React, { useContext, useState } from "react";
// import axios from "axios"; // To make API requests to the backend
// import { AuthContext } from "../../providers/AuthProvider";

// const AddTask = () => {
//   const { user, loading } = useContext(AuthContext); // Access user and loading state from context
//   const [taskTitle, setTaskTitle] = useState("");
//   const [taskDetail, setTaskDetail] = useState("");
//   const [requiredWorkers, setRequiredWorkers] = useState(0);
//   const [payableAmount, setPayableAmount] = useState(0);
//   const [completionDate, setCompletionDate] = useState("");
//   const [submissionInfo, setSubmissionInfo] = useState("");
//   const [taskImageUrl, setTaskImageUrl] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // Calculate the total payable amount
//   const totalPayableAmount = requiredWorkers * payableAmount;

//   // Handle form submission
//   const handleAddTask = async (e) => {
//     e.preventDefault();

//     if (!taskTitle || !taskDetail || !requiredWorkers || !payableAmount || !completionDate) {
//       setError("Please fill in all required fields.");
//       return;
//     }

//     if (totalPayableAmount > user.coins) {
//       setError("Not enough coins. Please purchase more.");
//       return;
//     }

//     try {
//       // 1. Save the task in the database (to your MongoDB backend)
//       const task = {
//         task_title: taskTitle,
//         task_detail: taskDetail,
//         required_workers: requiredWorkers,
//         payable_amount: payableAmount,
//         completion_date: completionDate,
//         submission_info: submissionInfo,
//         task_image_url: taskImageUrl,
//       };

//       const response = await axios.post("http://localhost:5000/tasks", task);

//       // 2. Deduct coins from the user
//       await axios.patch("http://localhost:5000/users/deduct-coins", {
//         email: user.email,
//         amount: totalPayableAmount,
//       });

//       setSuccess("Task added successfully!");
//       setError(""); // Clear any previous error
//     } catch (err) {
//       console.error("Error adding task:", err);
//       setError("Error adding task. Please try again.");
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Show a loading state while the user is being fetched
//   }

//   return (
//     <div className="max-w-7xl mx-auto py-8">
//       <h2 className="text-2xl font-semibold text-center mb-6">Add New Task</h2>
      
//       {/* Success/Error Message */}
//       {error && <div className="bg-red-500 text-white p-4 mb-4">{error}</div>}
//       {success && <div className="bg-green-500 text-white p-4 mb-4">{success}</div>}

//       {/* Task Card */}
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
//         <form onSubmit={handleAddTask}>
//           <div className="mb-4">
//             <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700">
//               Task Title
//             </label>
//             <input
//               id="taskTitle"
//               type="text"
//               value={taskTitle}
//               onChange={(e) => setTaskTitle(e.target.value)}
//               required
//               className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="taskDetail" className="block text-sm font-medium text-gray-700">
//               Task Detail
//             </label>
//             <textarea
//               id="taskDetail"
//               value={taskDetail}
//               onChange={(e) => setTaskDetail(e.target.value)}
//               required
//               className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//             />
//           </div>

//           <div className="mb-4 flex space-x-4">
//             <div className="w-1/2">
//               <label htmlFor="requiredWorkers" className="block text-sm font-medium text-gray-700">
//                 Required Workers
//               </label>
//               <input
//                 id="requiredWorkers"
//                 type="number"
//                 value={requiredWorkers}
//                 onChange={(e) => setRequiredWorkers(parseInt(e.target.value))}
//                 required
//                 className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//               />
//             </div>
//             <div className="w-1/2">
//               <label htmlFor="payableAmount" className="block text-sm font-medium text-gray-700">
//                 Payable Amount
//               </label>
//               <input
//                 id="payableAmount"
//                 type="number"
//                 value={payableAmount}
//                 onChange={(e) => setPayableAmount(parseFloat(e.target.value))}
//                 required
//                 className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//               />
//             </div>
//           </div>

//           <div className="mb-4">
//             <label htmlFor="completionDate" className="block text-sm font-medium text-gray-700">
//               Completion Date
//             </label>
//             <input
//               id="completionDate"
//               type="date"
//               value={completionDate}
//               onChange={(e) => setCompletionDate(e.target.value)}
//               required
//               className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="submissionInfo" className="block text-sm font-medium text-gray-700">
//               Submission Info (optional)
//             </label>
//             <input
//               id="submissionInfo"
//               type="text"
//               value={submissionInfo}
//               onChange={(e) => setSubmissionInfo(e.target.value)}
//               className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="taskImageUrl" className="block text-sm font-medium text-gray-700">
//               Task Image URL (optional)
//             </label>
//             <input
//               id="taskImageUrl"
//               type="text"
//               value={taskImageUrl}
//               onChange={(e) => setTaskImageUrl(e.target.value)}
//               className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//             />
//           </div>

//           {/* Display the total payable amount */}
//           <div className="mb-4">
//             <p className="text-lg font-semibold">Total Payable Amount: {totalPayableAmount} coins</p>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//           >
//             Add Task
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddTask;
// // 