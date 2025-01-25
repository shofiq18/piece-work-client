

import React, { useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";

const CheckoutForm = ({ clientSecret, selectedPackage }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, setUser } = useContext(AuthContext); 

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
        clientSecret, 
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: user?.displayName || "Anonymous User", 
              email: user?.email || "noemail@example.com", 
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
          amount: paymentIntent.amount / 100, 
          transactionId: paymentIntent.id,
          email: user?.email, 
          coins: selectedPackage.coins, 
          timestamp: new Date(),
        };

        try {
          const response = await axios.post(
            "https://piece-work-server.vercel.app/save-payment", 
            paymentDetails
          );

          if (response.data.success) {
            // Update user state using setUser after successful payment
            setUser((prevUser) => ({
              ...prevUser,
              coins: prevUser.coins + selectedPackage.coins, 
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
        cardElement.clear(); 
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
