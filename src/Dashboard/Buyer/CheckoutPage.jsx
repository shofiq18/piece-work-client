
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { package: selectedPackage } = location.state || {};
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (!selectedPackage) {
      navigate("/dashboard/buy-coin"); 
      return;
    }

    const createPaymentIntent = async () => {
      try {
        const response = await axiosSecure.post("/create-payment-intent", {
          amount: selectedPackage.price * 100, 
        });

        if (response.data && response.data.clientSecret) {
          setClientSecret(response.data.clientSecret); 
        } else {
          console.error("Client secret not received:", response.data);
        }
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    createPaymentIntent();
  }, [selectedPackage, axiosSecure, navigate]);

  if (!selectedPackage) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Selected Package</h2>
        <p className="text-lg">
          <strong>{selectedPackage.coins} Coins</strong> for <strong>${selectedPackage.price}</strong>
        </p>
      </div>

      {clientSecret && (
        <div className="mt-6">
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm clientSecret={clientSecret} selectedPackage={selectedPackage} />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
