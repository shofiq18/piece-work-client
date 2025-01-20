import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BuyerDashboardHome = () => {
  const { user, setUser } = useContext(AuthContext);
  const [buyerStats, setBuyerStats] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true); // New loading state
  const axiosSecure = useAxiosSecure();

  // Fetch buyer stats
  const fetchBuyerStats = async () => {
    try {
      const response = await axiosSecure.get(`/buyer-home/${user.email}`);
      setBuyerStats(response.data);
    } catch (error) {
      console.error("Error fetching buyer stats:", error);
    }
  };

  // Fetch pending submissions
  const fetchSubmissions = async () => {
    setLoadingSubmissions(true);
    try {
      const response = await axiosSecure.get(`/buyer-home/submissions/${user.email}`);
      setSubmissions(response.data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBuyerStats();
      fetchSubmissions();
    }
  }, [user, axiosSecure]);
  

  const approveSubmission = async (submissionId, workerEmail, payableAmount) => {
    try {
      const response = await axiosSecure.put(`/approve-submission/${submissionId}`, {
        workerEmail,
        payableAmount,
      });
      alert("Submission approved successfully!");
  
      // Update user's coin balance in AuthContext
      setUser((prevUser) => ({
        ...prevUser,
        coins: prevUser.coins - payableAmount, // Deduct coins for buyer
      }));
  
      // Optionally, update worker's coins in UI
      // Here, you could also set a state for the worker's coins if needed
  
      // Remove approved submission from the list
      setSubmissions((prev) => prev.filter((submission) => submission._id !== submissionId));
  
      // Fetch updated buyer stats
      fetchBuyerStats();
    } catch (error) {
      console.error("Error approving submission:", error);
      alert("Failed to approve submission. Please try again.");
    }
  };
  

  // Reject submission
  const rejectSubmission = async (submissionId, taskId) => {
    try {
      await axiosSecure.patch(`/submissions/reject/${submissionId}`, { taskId });
      alert("Submission rejected successfully!");

      // Remove rejected submission from the list
      setSubmissions((prev) => prev.filter((submission) => submission._id !== submissionId));

      // Fetch updated buyer stats
      fetchBuyerStats();
    } catch (error) {
      console.error("Error rejecting submission:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Buyer Dashboard</h1>

      {/* Buyer Stats */}
      {buyerStats ? (
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-medium">Total Tasks</h2>
            <p className="text-2xl font-bold">{buyerStats.totalTasks}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-medium">Pending Tasks</h2>
            <p className="text-2xl font-bold">{buyerStats.pendingTasks}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-medium">Total Payment Paid</h2>
            <p className="text-2xl font-bold">${buyerStats.totalPayment}</p>
          </div>
        </div>
      ) : (
        <div className="text-lg">Loading Buyer Stats...</div>
      )}

      {/* Submissions Table */}
      <h2 className="text-2xl font-semibold my-6">Tasks To Review</h2>
      {loadingSubmissions ? (
        <p>Loading submissions...</p>
      ) : submissions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Worker Name</th>
                <th className="px-4 py-2 text-left">Task Title</th>
                <th className="px-4 py-2 text-left">Payable Amount</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission._id} className="border-t">
                  <td className="px-4 py-2">{submission.worker_name}</td>
                  <td className="px-4 py-2">{submission.task_title}</td>
                  <td className="px-4 py-2">${submission.payable_amount}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-md"
                      onClick={() => setSelectedSubmission(submission)}
                    >
                      View Submission
                    </button>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded-md"
                      onClick={() =>
                        approveSubmission(
                          submission._id,
                          submission.worker_email,
                          submission.payable_amount
                        )
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                      onClick={() => rejectSubmission(submission._id, submission.task_id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-lg">No pending submissions to review.</p>
      )}

      {/* Modal for Viewing Submission Details */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Submission Details</h3>
            <p><strong>Task Title:</strong> {selectedSubmission.task_title}</p>
            <p><strong>Worker Name:</strong> {selectedSubmission.worker_name}</p>
            <p><strong>Payable Amount:</strong> ${selectedSubmission.payable_amount}</p>
            <p><strong>Status:</strong> {selectedSubmission.status}</p>
            <p className="mt-4"><strong>Submission Info:</strong></p>
            <p className="bg-gray-100 p-4 rounded-lg">{selectedSubmission.submission_info}</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={() => setSelectedSubmission(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerDashboardHome;
