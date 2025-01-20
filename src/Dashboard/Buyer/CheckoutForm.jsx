// import React, { useState } from "react";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const CheckoutForm = ({ selectedPackage }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const axiosSecure = useAxiosSecure();
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!stripe || !elements) return;

//     setIsProcessing(true);
//     try {
//       const card = elements.getElement(CardElement);
//       const { paymentMethod, error } = await stripe.createPaymentMethod({
//         type: "card",
//         card,
//       });

//       if (error) {
//         console.error("Error creating payment method:", error);
//         setIsProcessing(false);
//         return;
//       }

//       const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
//         "{clientSecret}", // Replace with your clientSecret
//         {
//           payment_method: paymentMethod.id,
//         }
//       );

//       if (confirmError) {
//         console.error("Error confirming payment:", confirmError);
//         setIsProcessing(false);
//         return;
//       }

//       // Save the payment info and update coins
     


//     const paymentData = {
//         packageId: selectedPackage.id, // Optional, in case you store package IDs
//         coins: selectedPackage.coins,
//         amount: selectedPackage.price,
//         transactionId: paymentIntent.id, // Unique ID from Stripe
//         paymentStatus: "success",
//       };

//       // Send payment info to the backend
//       try {
//         const response = await axiosSecure.post("/payment-success", paymentData);
//         if (response.data.success) {
//           alert("Payment successful! Your coins have been added.");
//         }
//         setIsProcessing(false);
//       } catch (saveError) {
//         console.error("Error saving payment info:", saveError);
//         setIsProcessing(false);
//       }
//     } catch (error) {
//       console.error("Payment error:", error);
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow">
//       <CardElement className="mb-4 p-2 border rounded-lg" />
//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
//         disabled={!stripe || isProcessing}
//       >
//         {isProcessing ? "Processing..." : "Pay Now"}
//       </button>
//     </form>
//   );
// };

// export default CheckoutForm;

import React, { useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";

const CheckoutForm = ({ clientSecret, selectedPackage }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, setUser } = useContext(AuthContext); // Get the current user and setUser function from AuthContext

  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe is not loaded properly.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card Element is not available.");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Confirm the payment
      const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(
        clientSecret, // Use the passed clientSecret
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: user?.displayName || "Anonymous User", // Get the user's name from AuthContext
              email: user?.email || "noemail@example.com", // Get the user's email from AuthContext
            },
          },
        }
      );

      if (paymentError) {
        console.error("Payment error:", paymentError);
        setError(paymentError.message);
        setProcessing(false);
        return;
      }

      // Payment successful
      if (paymentIntent.status === "succeeded") {
        setSuccess(true);
        setTransactionId(paymentIntent.id);

        console.log("Payment succeeded:", paymentIntent);

        // Save the payment info and update coins in your backend
        const paymentDetails = {
          amount: paymentIntent.amount / 100, // Amount in dollars
          transactionId: paymentIntent.id,
          email: user?.email, // Email from AuthContext
          coins: selectedPackage.coins, // Coins purchased
          timestamp: new Date(),
        };

        try {
          const response = await axios.post(
            "http://localhost:5000/save-payment", // Backend endpoint
            paymentDetails
          );

          if (response.data.success) {
            // Update user state using setUser after successful payment
            setUser((prevUser) => ({
              ...prevUser,
              coins: prevUser.coins + selectedPackage.coins, // Update coins
            }));
            alert("Payment successful! Coins have been added to your account.");
          } else {
            setError("Failed to update coins. Please contact support.");
          }
        } catch (saveError) {
          console.error("Error saving payment info:", saveError);
          setError("Failed to save payment details. Please contact support.");
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setProcessing(false);

      // Reset the CardElement after payment attempt (successful or failed)
      const cardElement = elements.getElement(CardElement);
      if (cardElement) {
        cardElement.clear(); // Clears the input fields of CardElement
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Enter Your Payment Details</h2>

        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <button
          type="submit"
          disabled={!stripe || processing || success}
          className={`mt-6 px-4 py-2 rounded bg-blue-600 text-white ${processing ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>
      </form>

      {success && (
        <div className="mt-6 bg-green-100 p-4 rounded-lg">
          <h3 className="text-green-700 font-bold">Payment Successful!</h3>
          <p>Transaction ID: {transactionId}</p>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
