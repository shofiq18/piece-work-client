import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";

const Submissions = () => {
  const { user, loading } = useContext(AuthContext); 
  const [submissions, setSubmissions] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(0);
  const [totalSubmissions, setTotalSubmissions] = useState(0); 
  const [error, setError] = useState(null);

  const limit = 10; 

  // Fetch paginated submissions for the logged-in worker
  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!user) return;

      try {
        const response = await axios.get(
          `https://piece-work-server.vercel.app/submissions?page=${currentPage}&limit=${limit}&worker_email=${user.email}`
        );

        // Extract data from the response
        const { submissions, totalSubmissions, totalPages } = response.data;

        setSubmissions(submissions); 
        setTotalPages(totalPages); 
        setTotalSubmissions(totalSubmissions); 
      } catch (error) {
        setError("Failed to fetch submissions.");
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
  }, [user, currentPage]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">My Submissions</h2>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200 text-sm sm:text-base">
          <thead>
            <tr>
              <th className="px-2 sm:px-4 py-2 border bg-gray-100">Task Title</th>
              <th className="px-2 sm:px-4 py-2 border bg-gray-100">Submission Details</th>
              <th className="px-2 sm:px-4 py-2 border bg-gray-100">Payable Amount</th>
              <th className="px-2 sm:px-4 py-2 border bg-gray-100">Status</th>
              <th className="px-2 sm:px-4 py-2 border bg-gray-100">Date Submitted</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length > 0 ? (
              submissions.map((submission) => (
                <tr key={submission._id} className="hover:bg-gray-50">
                  <td className="px-2 sm:px-4 py-2 border">{submission.task_title}</td>
                  <td className="px-2 sm:px-4 py-2 border">{submission.submission_details}</td>
                  <td className="px-2 sm:px-4 py-2 border">${submission.payable_amount}</td>
                  <td
                    className={`px-2 sm:px-4 py-2 border ${
                      submission.status === "pending"
                        ? "bg-yellow-300"
                        : submission.status === "completed"
                        ? "bg-green-300"
                        : "bg-red-300"
                    }`}
                  >
                    {submission.status}
                  </td>
                  <td className="px-2 sm:px-4 py-2 border">
                    {new Date(submission.current_date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No submissions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-wrap justify-center items-center mt-4 gap-2">
        <button
          className={`px-3 py-1 sm:px-4 sm:py-2 border rounded-md ${
            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-1 sm:px-4 sm:py-2 border rounded-md ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={`px-3 py-1 sm:px-4 sm:py-2 border rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Total Submissions Info */}
      <div className="text-center mt-4">
        <p className="text-sm sm:text-base">
          Showing <span className="font-semibold">{submissions.length}</span> of{" "}
          <span className="font-semibold">{totalSubmissions}</span> submissions
        </p>
      </div>
    </div>
  );
};

export default Submissions;
