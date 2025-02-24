import React from "react";
import { useNavigate } from "react-router-dom";
import CoinPackages from "./CoinPackages";

const PurchaseCoins = () => {
  const navigate = useNavigate();

  // Handle package selection
  const handlePackageSelect = (pkg) => {
    navigate(`/dashboard/checkout`, { state: { package: pkg } }); 
  };

  return (
    <div>
      <CoinPackages onSelectPackage={handlePackageSelect}></CoinPackages>
    </div>
  );
};

export default PurchaseCoins;
