import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTasks, FaHourglassHalf, FaDollarSign } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";

const WorkerHome = () => {
  const { user } = useContext(AuthContext); // Fetch worker's email from AuthContext
  const axiosSecure = useAxiosSecure();

  // Fetch worker stats
  const { data: stats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ["worker-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/worker-stats/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email, // Only fetch if user email is available
  });

  // Fetch approved submissions
  const { data: approvedSubmissions = [], isLoading: submissionsLoading } = useQuery({
    queryKey: ["approved-submissions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/approved-submissions/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (statsLoading || submissionsLoading) {
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  }

  const { totalSubmissions, totalPendingSubmissions, totalEarnings } = stats;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Statistics Section */}
      <h1 className="text-2xl font-bold text-center mb-6">Worker Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {/* Total Submissions */}
        <div className="flex items-center justify-between p-4 bg-blue-100 rounded-lg shadow">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Total Submissions</h2>
            <p className="text-3xl font-bold text-blue-700">{totalSubmissions}</p>
          </div>
          <FaTasks className="text-blue-500 text-4xl" />
        </div>

        {/* Total Pending Submissions */}
        <div className="flex items-center justify-between p-4 bg-yellow-100 rounded-lg shadow">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Pending Submissions</h2>
            <p className="text-3xl font-bold text-yellow-700">{totalPendingSubmissions}</p>
          </div>
          <FaHourglassHalf className="text-yellow-500 text-4xl" />
        </div>

        {/* Total Earnings */}
        <div className="flex items-center justify-between p-4 bg-green-100 rounded-lg shadow">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Total Earnings</h2>
            <p className="text-3xl font-bold text-green-700">${totalEarnings}</p>
          </div>
          <FaDollarSign className="text-green-500 text-4xl" />
        </div>
      </div>

      {/* Approved Submissions Table */}
      <h2 className="text-xl font-bold mb-4">Approved Submissions</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border border-gray-200">Task Title</th>
              <th className="px-4 py-2 border border-gray-200">Payable Amount</th>
              <th className="px-4 py-2 border border-gray-200">Buyer Name</th>
              <th className="px-4 py-2 border border-gray-200">Status</th>
            </tr>
          </thead>
          <tbody>
            {approvedSubmissions.map((submission) => (
              <tr key={submission._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-200">{submission.task_title}</td>
                <td className="px-4 py-2 border border-gray-200">${submission.payable_amount}</td>
                <td className="px-4 py-2 border border-gray-200">{submission.buyer_name}</td>
                <td className="px-4 py-2 border border-gray-200 text-green-600 font-semibold">
                  {submission.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerHome;
