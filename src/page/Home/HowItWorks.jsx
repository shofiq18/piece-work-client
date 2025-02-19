const steps = [
  {
    id: 1,
    title: "Register",
    description: "Create an account as a Worker or Buyer to get started.",
    icon: "https://img.icons8.com/ios-filled/50/user.png",
  },
  {
    id: 2,
    title: "Post or Complete Tasks",
    description:
      "Buyers can post tasks, and Workers can complete tasks to earn coins.",
    icon: "https://img.icons8.com/ios-filled/50/task.png",
  },
  {
    id: 3,
    title: "Get Paid",
    description:
      "Workers withdraw earnings, and Buyers get work done effortlessly.",
    icon: "https://img.icons8.com/ios-filled/50/money.png",
  },
];

const HowItWorks = () => {
  return (
    <div>
      <section className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.id}
                className="bg-blue-100 p-6 rounded-lg shadow-md transform transition duration-300 hover:-translate-y-3 hover:shadow-lg hover:bg-blue-200"
              >
                <img
                  src={step.icon}
                  alt={step.title}
                  className="w-16 h-16 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                <p className="text-gray-600 mt-2">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className=" text-3xl md:text-4xl font-bold text-gray-800 mb-8">Why Choose PieceWork?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center px-3">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white">
                  <path d="M12 0L24 12L12 24L0 12L12 0Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Flexible Earnings</h3>
              <p className="text-gray-600 px-3">Earn at your own pace by completing simple micro-tasks that fit your schedule.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white">
                  <path d="M12 0L24 12L12 24L0 12L12 0Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Trustworthy Platform</h3>
              <p className="text-gray-600 px-3">We ensure all tasks are legitimate, so you can work with confidence and security.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white">
                  <path d="M12 0L24 12L12 24L0 12L12 0Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Instant Payments</h3>
              <p className="text-gray-600 px-3">Get paid quickly and securely upon task completion.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HowItWorks;
