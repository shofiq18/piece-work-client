const pricingPlans = [
    { id: 1, coins: 10, price: "$1" },
    { id: 2, coins: 150, price: "$10" },
    { id: 3, coins: 500, price: "$20" },
    { id: 4, coins: 1000, price: "$35" },
  ];
  
  const Pricing = () => {
    return (
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Affordable Pricing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className="group perspective overflow-hidden"
              >
                {/* 3D Card */}
                <div
                  className="relative bg-white rounded-lg shadow-lg transform transition-transform duration-500 group-hover:rotate-x-12 group-hover:rotate-y-12 group-hover:scale-105"
                >
                  {/* Layered Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-blue-500 to-purple-500 blur-lg opacity-75 transition-opacity duration-500 group-hover:opacity-100 animate-pulse"></div>
                  
                  {/* Card Content */}
                  <div className="relative z-10 p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {plan.coins} Coins
                    </h3>
                    <p className="text-lg text-gray-700 mt-2">{plan.price}</p>
                    <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Pricing;
  