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
      <h1 className="text-4xl font-extrabold text-center mb-8 ">
        Payment History
      </h1>

      {payments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto border  w-full rounded-lg shadow-lg">
            <thead>
              <tr className="border bg-gray-100 text-gray-700">
                <th className="px-6 py-3 text-left font-medium">Transaction ID</th>
                <th className="px-6 py-3 text-left  font-medium">Coins Purchased</th>
                <th className="px-6 py-3 text-left  font-medium">Amount Paid ($)</th>
                <th className="px-6 py-3 text-left  font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={payment.transactionId}
                  className={`border-t ${index % 2 === 0 ? "bg-gray-50" : ""} hover:bg-gray-100`}
                >
                  <td className="px-6 py-4">{payment.transactionId}</td>
                  <td className="px-6 py-4 ">{payment.coins}</td>
                  <td className="px-6 py-4">${payment.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
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
          <p className="text-lg font-medium ">No payment history found.</p>
          <p className="">Make a purchase to see your payment history here.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
