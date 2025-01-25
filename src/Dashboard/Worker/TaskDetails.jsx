
// ``
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";

const TaskDetails = () => {
  const { taskId } = useParams(); 
  const { user, loading } = useContext(AuthContext); 
  const [task, setTask] = useState(null);
  const [submissionDetails, setSubmissionDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Ensure the user is logged in before accessing task details
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Please log in to view this task.</p>;
  }

  // Fetch task details
  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`https://piece-work-server.vercel.app/tasks/${taskId}`);
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submissionData = {
      task_id: task._id,
      task_title: task.task_title,
      payable_amount: task.payable_amount,
      worker_email: user.email,
      submission_details: submissionDetails,
      worker_name: user.displayName || user.name, 
      buyer_name: task.buyer_name,
      buyer_email: task.buyer_email,
      current_date: new Date().toISOString(),
      status: "pending",
    };

    try {
      await axios.post("https://piece-work-server.vercel.app/submissions", submissionData);
      alert("Submission successful!");
      navigate("/dashboard/submissions"); 
    } catch (error) {
      console.error("Error submitting task:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!task) {
    return <p>Loading task details...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Task Details</h2>
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-bold mb-2">{task.task_title}</h3>
        <p><strong>Buyer Name:</strong> {task.buyer_name}</p>
        <p><strong>Buyer Email:</strong> {task.buyer_email}</p>
        <p><strong>Completion Date:</strong> {new Date(task.completion_date).toLocaleDateString()}</p>
        <p><strong>Payable Amount:</strong> ${task.payable_amount}</p>
        <p><strong>Required Workers:</strong> {task.required_workers}</p>
        <p><strong>Task Details:</strong> {task.task_detail}</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        <h3 className="text-2xl font-bold mb-4">Submit Your Work</h3>
        <textarea
          name="submission_details"
          value={submissionDetails}
          onChange={(e) => setSubmissionDetails(e.target.value)}
          className="w-full p-4 border rounded-lg"
          rows="5"
          placeholder="Enter your submission details (e.g., proof or a description)"
          required
        ></textarea>
        <button
          type="submit"
          className={`mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default TaskDetails;
