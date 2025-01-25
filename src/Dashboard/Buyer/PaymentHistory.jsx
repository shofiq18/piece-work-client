import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext); 
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
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
        Payment History
      </h1>

      {payments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-3 text-left text-gray-600 font-medium">Transaction ID</th>
                <th className="px-6 py-3 text-left text-gray-600 font-medium">Coins Purchased</th>
                <th className="px-6 py-3 text-left text-gray-600 font-medium">Amount Paid ($)</th>
                <th className="px-6 py-3 text-left text-gray-600 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={payment.transactionId}
                  className={`border-t ${index % 2 === 0 ? "bg-gray-50" : ""} hover:bg-gray-100`}
                >
                  <td className="px-6 py-4 text-gray-800">{payment.transactionId}</td>
                  <td className="px-6 py-4 text-gray-800">{payment.coins}</td>
                  <td className="px-6 py-4 text-gray-800">${payment.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-800">
                    {new Date(payment.timestamp).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center mt-12">
          <p className="text-lg font-medium text-gray-700">No payment history found.</p>
          <p className="text-gray-500">Make a purchase to see your payment history here.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
