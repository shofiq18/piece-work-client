import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";

const Submissions = () => {
  const { user, loading } = useContext(AuthContext); // Get logged-in user from AuthContext
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      // Fetch submissions where workerEmail matches the logged-in worker's email
      const fetchSubmissions = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/submissions`);
          const filteredSubmissions = response.data.filter(
            (submission) => submission.worker_email === user.email
          );
          setSubmissions(filteredSubmissions);
        } catch (error) {
          setError("Failed to fetch submissions.");
          console.error("Error fetching submissions:", error);
        }
      };

      fetchSubmissions();
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Submissions</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Task Title</th>
            <th className="px-4 py-2 border">Submission Details</th>
            <th className="px-4 py-2 border">Payable Amount</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Date Submitted</th>
          </tr>
        </thead>
        <tbody>
          {submissions.length > 0 ? (
            submissions.map((submission) => (
              <tr key={submission._id}>
                <td className="px-4 py-2 border">{submission.task_title}</td>
                <td className="px-4 py-2 border">{submission.submission_details}</td>
                <td className="px-4 py-2 border">${submission.payable_amount}</td>
                <td
                  className={`px-4 py-2 border ${
                    submission.status === "pending"
                      ? "bg-yellow-300"
                      : submission.status === "completed"
                      ? "bg-green-300"
                      : "bg-red-300"
                  }`}
                >
                  {submission.status}
                </td>
                <td className="px-4 py-2 border">{new Date(submission.current_date).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">No submissions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Submissions;
