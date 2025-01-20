import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user's email
  const [payments, setPayments] = useState([]);
  const axiosSecure = useAxiosSecure();

  // Fetch payment history for the logged-in user
  const fetchPaymentHistory = async () => {
    try {
      const response = await axiosSecure.get(`/payment-history/${user.email}`);
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payment history:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPaymentHistory();
    }
  }, [user, axiosSecure]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Payment History</h1>
      {payments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Transaction ID</th>
                <th className="px-4 py-2 text-left">Coins Purchased</th>
                <th className="px-4 py-2 text-left">Amount Paid ($)</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.transactionId} className="border-t">
                  <td className="px-4 py-2">{payment.transactionId}</td>
                  <td className="px-4 py-2">{payment.coins}</td>
                  <td className="px-4 py-2">${payment.amount}</td>
                  <td className="px-4 py-2">
                    {new Date(payment.createdAt).toLocaleDateString("en-US")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-lg">No payment history found.</p>
      )}
    </div>
  );
};

export default PaymentHistory;
