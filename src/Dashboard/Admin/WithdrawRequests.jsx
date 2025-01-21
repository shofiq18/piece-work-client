
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const WithdrawRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [withdrawals, setWithdrawals] = useState([]);

  // Fetch pending withdrawals
  const fetchPendingWithdrawals = async () => {
    try {
      const response = await axiosSecure.get("/withdrawals/pending");
      setWithdrawals(response.data);
    } catch (error) {
      console.error("Error fetching pending withdrawals:", error);
    }
  };

  useEffect(() => {
    fetchPendingWithdrawals();
  }, []);

  // Approve withdrawal request
  const handleApprove = async (withdrawal) => {
    const { _id, worker_email, withdrawal_coin } = withdrawal;

    try {
      await axiosSecure.post("/withdrawals/approve", {
        withdrawalId: _id,
        worker_email,
        withdrawal_coin,
      });

      alert("Withdrawal approved successfully!");
      // Remove approved withdrawal from the UI
      setWithdrawals((prev) =>
        prev.filter((item) => item._id !== _id)
      );
    } catch (error) {
      console.error("Error approving withdrawal:", error);
      alert("Failed to approve withdrawal.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Withdraw Requests</h1>

      {withdrawals.length === 0 ? (
        <p className="text-lg text-gray-500">No pending withdrawals.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">Worker Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Coins</th>
              <th className="py-3 px-4 text-left">Amount ($)</th>
              <th className="py-3 px-4 text-left">Payment System</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((withdrawal) => (
              <tr key={withdrawal._id} className="border-t">
                <td className="py-3 px-4">{withdrawal.worker_name}</td>
                <td className="py-3 px-4">{withdrawal.worker_email}</td>
                <td className="py-3 px-4">{withdrawal.withdrawal_coin}</td>
                <td className="py-3 px-4">${withdrawal.withdrawal_amount}</td>
                <td className="py-3 px-4">{withdrawal.payment_system}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={() => handleApprove(withdrawal)}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WithdrawRequests;
