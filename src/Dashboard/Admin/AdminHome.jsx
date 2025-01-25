import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUsers, FaMoneyBillAlt, FaCoins, FaUserTie } from "react-icons/fa";
import WithdrawRequests from "./WithdrawRequests";

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
    <div className="p-4">
      <div className="max-w-6xl mx-auto mb-12 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Workers */}
          <div className="flex flex-col items-center text-center bg-blue-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <FaUsers className="text-blue-500 text-5xl mb-4" />
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Total Workers
            </h2>
            <p className="text-3xl font-bold text-blue-700">{totalWorkers}</p>
          </div>

          {/* Total Buyers */}
          <div className="flex flex-col items-center text-center bg-green-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <FaUserTie className="text-green-500 text-5xl mb-4" />
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Total Buyers
            </h2>
            <p className="text-3xl font-bold text-green-700">{totalBuyers}</p>
          </div>

          {/* Total Available Coins */}
          <div className="flex flex-col items-center text-center bg-yellow-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <FaCoins className="text-yellow-500 text-5xl mb-4" />
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Available Coins
            </h2>
            <p className="text-3xl font-bold text-yellow-700">
              {totalAvailableCoins}
            </p>
          </div>

          {/* Total Payments */}
          <div className="flex flex-col items-center text-center bg-red-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <FaMoneyBillAlt className="text-red-500 text-5xl mb-4" />
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Total Payments
            </h2>
            <p className="text-3xl font-bold text-red-700">{totalPayments}</p>
          </div>
        </div>
      </div>

      {/* Withdraw Requests Section */}
      <WithdrawRequests />
    </div>
  );
};

export default AdminHome;
