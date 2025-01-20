import React from "react";

const CoinPackages = ({ onSelectPackage }) => {
  const coinPackages = [
    { coins: 10, price: 1 },
    { coins: 150, price: 10 },
    { coins: 500, price: 20 },
    { coins: 1000, price: 35 },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Buy Coins</h1>
      <p className="text-gray-600 mb-8">Select a coin package and proceed to payment.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {coinPackages.map((pkg) => (
          <div
            key={pkg.coins}
            className="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-bold mb-4">{pkg.coins} Coins</h2>
            <p className="text-lg font-medium mb-4">${pkg.price}</p>
            <button
              onClick={() => onSelectPackage(pkg)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoinPackages;
