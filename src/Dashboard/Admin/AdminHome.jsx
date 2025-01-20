import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUsers, FaMoneyBillAlt, FaCoins, FaUserTie } from "react-icons/fa";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch admin stats
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  }

  const { totalWorkers, totalBuyers, totalAvailableCoins, totalPayments } = stats;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Total Workers */}
        <div className="flex items-center justify-between p-4 bg-blue-100 rounded-lg shadow">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Total Workers</h2>
            <p className="text-3xl font-bold text-blue-700">{totalWorkers}</p>
          </div>
          <FaUsers className="text-blue-500 text-4xl" />
        </div>

        {/* Total Buyers */}
        <div className="flex items-center justify-between p-4 bg-green-100 rounded-lg shadow">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Total Buyers</h2>
            <p className="text-3xl font-bold text-green-700">{totalBuyers}</p>
          </div>
          <FaUserTie className="text-green-500 text-4xl" />
        </div>

        {/* Total Available Coins */}
        <div className="flex items-center justify-between p-4 bg-yellow-100 rounded-lg shadow">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Available Coins</h2>
            <p className="text-3xl font-bold text-yellow-700">{totalAvailableCoins}</p>
          </div>
          <FaCoins className="text-yellow-500 text-4xl" />
        </div>

        {/* Total Payments */}
        <div className="flex items-center justify-between p-4 bg-red-100 rounded-lg shadow">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Total Payments</h2>
            <p className="text-3xl font-bold text-red-700">{totalPayments}</p>
          </div>
          <FaMoneyBillAlt className="text-red-500 text-4xl" />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
