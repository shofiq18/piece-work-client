import React from "react";

const CoinPackages = ({ onSelectPackage }) => {
  const coinPackages = [
    { coins: 10, price: 1, label: "Starter" },
    { coins: 150, price: 10, label: "Most Popular" },
    { coins: 500, price: 20, label: "Best Value" },
    { coins: 1000, price: 35, label: "Ultimate" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
        Choose Your Coin Package
      </h1>
      <p className="text-gray-600 text-center mb-12">
        Select a package and start earning faster. 
        <span className="block text-gray-800 font-semibold">
          The more coins, the better the value!
        </span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {coinPackages.map((pkg, index) => (
          <div
            key={pkg.coins}
            className={`relative bg-gradient-to-br ${
              index % 2 === 0
                ? "from-blue-400 to-blue-600"
                : "from-green-400 to-green-600"
            } p-6 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300`}
          >
            {pkg.label === "Most Popular" && (
              <span className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow">
                {pkg.label}
              </span>
            )}
            <h2 className="text-3xl font-extrabold text-white mb-4">
              {pkg.coins} Coins
            </h2>
            <p className="text-xl font-medium text-gray-100 mb-6">
              Only <span className="font-bold">${pkg.price}</span>
            </p>
            <button
              onClick={() => onSelectPackage(pkg)}
              className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg shadow-lg hover:bg-blue-100 transition-colors duration-300"
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
