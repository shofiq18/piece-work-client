// import React, { useState, useContext } from "react";
// import { AuthContext } from "../../providers/AuthProvider";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const Withdrawals = () => {
//   const { user, setUser } = useContext(AuthContext); // Get the current user and setUser function
//   const axiosSecure = useAxiosSecure();
//   const [withdrawCoin, setWithdrawCoin] = useState(0);
//   const [withdrawAmount, setWithdrawAmount] = useState(0);
//   const [paymentSystem, setPaymentSystem] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Calculate withdrawal amount when coins change
//   const handleCoinChange = (e) => {
//     const coins = parseInt(e.target.value, 10) || 0;
//     setWithdrawCoin(coins);
//     setWithdrawAmount(coins / 20); // 20 coins = $1
//   };

//   // Handle form submission
//   const handleWithdraw = async (e) => {
//     e.preventDefault();

//     if (withdrawCoin > user.coins) {
//       alert("You cannot withdraw more coins than you have.");
//       return;
//     }

//     const withdrawalData = {
//       worker_email: user.email,
//       worker_name: user.name,
//       withdrawal_coin: withdrawCoin,
//       withdrawal_amount: withdrawAmount,
//       payment_system: paymentSystem,
//       account_number: accountNumber,
//       withdraw_date: new Date().toISOString(),
//       status: "pending",
//     };

//     setLoading(true);
//     try {
//       await axiosSecure.post("/withdrawals", withdrawalData);

//       // Update user's coins in AuthContext
//       const updatedUser = { ...user, coins: user.coins - withdrawCoin };
//       setUser(updatedUser);

//       alert("Withdrawal request submitted successfully!");
//       // Clear form fields
//       setWithdrawCoin(0);
//       setWithdrawAmount(0);
//       setPaymentSystem("");
//       setAccountNumber("");
//     } catch (error) {
//       console.error("Error submitting withdrawal request:", error);
//       alert("Failed to submit withdrawal request. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Withdraw Coins</h1>

//       {/* User Total Earnings */}
//       <div className="bg-white p-6 rounded-lg shadow mb-6">
//         <h2 className="text-xl font-semibold">Your Earnings</h2>
//         <p className="text-lg mt-2">
//           <strong>Total Coins:</strong> {user.coins}
//         </p>
//         <p className="text-lg">
//           <strong>Withdrawable Amount:</strong> ${(user.coins / 20).toFixed(2)}
//         </p>
//       </div>

//       {/* Withdrawal Form */}
//       {user.coins >= 200 ? (
//         <form className="bg-white p-6 rounded-lg shadow" onSubmit={handleWithdraw}>
//           <h2 className="text-xl font-semibold mb-4">Withdrawal Form</h2>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Coins to Withdraw
//             </label>
//             <input
//               type="number"
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               min="0"
//               max={user.coins}
//               value={withdrawCoin}
//               onChange={handleCoinChange}
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Withdrawal Amount ($)
//             </label>
//             <input
//               type="text"
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
//               value={withdrawAmount.toFixed(2)}
//               readOnly
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Select Payment System
//             </label>
//             <select
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               value={paymentSystem}
//               onChange={(e) => setPaymentSystem(e.target.value)}
//               required
//             >
//               <option value="" disabled>
//                 Select Payment System
//               </option>
//               <option value="Bkash">Bkash</option>
//               <option value="Rocket">Rocket</option>
//               <option value="Nagad">Nagad</option>
//               <option value="PayPal">PayPal</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Account Number
//             </label>
//             <input
//               type="text"
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               value={accountNumber}
//               onChange={(e) => setAccountNumber(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${
//               loading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={loading}
//           >
//             {loading ? "Processing..." : "Withdraw"}
//           </button>
//         </form>
//       ) : (
//         <p className="text-lg text-red-500 font-medium">
//           Insufficient coin. You need at least 200 coins to withdraw.
//         </p>
//       )}
//     </div>
//   );
// };

// export default Withdrawals;
import React, { useState, useContext, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";

const Withdrawals = () => {
  const { user, setUser } = useContext(AuthContext); // Fetch user data from AuthContext
  const axiosSecure = useAxiosSecure();

  const [withdrawCoin, setWithdrawCoin] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  useEffect(() => {
    // Calculate withdrawal amount dynamically (20 coins = $1)
    setWithdrawAmount((withdrawCoin / 20).toFixed(2));
  }, [withdrawCoin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (withdrawCoin > user.coins) {
      alert("Insufficient coins for this withdrawal.");
      return;
    }

    if (withdrawCoin < 200) {
      alert("Minimum withdrawal is 200 coins (10 dollars).");
      return;
    }

    const withdrawalRequest = {
      worker_email: user.email,
      worker_name: user.name,
      withdrawal_coin: withdrawCoin,
      withdrawal_amount: withdrawAmount,
      payment_system: paymentSystem,
      account_number: accountNumber,
      withdraw_date: new Date().toISOString(),
      status: "pending", // Status will be updated by the admin
    };

    try {
      // Submit withdrawal request to the backend
      await axiosSecure.post("/withdrawals", withdrawalRequest);

      alert("Withdrawal request submitted successfully!");

      // Update user data locally (without requiring a page refresh)
      setUser((prevUser) => ({
        ...prevUser,
        coins: prevUser.coins - withdrawCoin, // Deduct coins locally for a smooth UI
      }));

      // Reset form fields
      setWithdrawCoin(0);
      setPaymentSystem("");
      setAccountNumber("");
    } catch (error) {
      console.error("Error submitting withdrawal request:", error);
      alert("Failed to submit withdrawal request.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Withdraw Coins</h1>

      <div className="mb-4">
        <p className="text-lg">
          <strong>Available Coins:</strong> {user.coins}
        </p>
        <p className="text-lg">
          <strong>Withdrawal Amount ($):</strong> $
          {(user.coins / 20).toFixed(2)}
        </p>
      </div>

      {user.coins < 200 ? (
        <p className="text-red-500 text-lg">
          You need at least 200 coins (10 dollars) to withdraw.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Coins to Withdraw
            </label>
            <input
              type="number"
              min="200"
              max={user.coins}
              value={withdrawCoin}
              onChange={(e) => setWithdrawCoin(Number(e.target.value))}
              className="w-full p-2 border rounded-md"
              placeholder="Enter coins to withdraw"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Withdrawal Amount ($)
            </label>
            <input
              type="text"
              value={`$${withdrawAmount}`}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Select Payment System
            </label>
            <select
              value={paymentSystem}
              onChange={(e) => setPaymentSystem(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="" disabled>
                Choose a payment system
              </option>
              <option value="Bkash">Bkash</option>
              <option value="Rocket">Rocket</option>
              <option value="Nagad">Nagad</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Account Number
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter account number"
              required
            />
          </div>

          <button
            type="submit"
            disabled={withdrawCoin < 200 || withdrawCoin > user.coins}
            className={`w-full p-2 bg-blue-500 text-white rounded-md ${
              withdrawCoin < 200 || withdrawCoin > user.coins
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
          >
            Submit Withdrawal Request
          </button>
        </form>
      )}
    </div>
  );
};

export default Withdrawals;
