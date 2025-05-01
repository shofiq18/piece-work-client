
import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

// Variants for cards
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
  hover: {
    scale: 1.05,
    y: -10,
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },
};

// Variants for grid container to stagger children
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

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
  // Refs and controls for scroll-triggered animations
  const howItWorksRef = useRef(null);
  const whyChooseRef = useRef(null);
  const howItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.3 });
  const whyChooseInView = useInView(whyChooseRef, { once: true, amount: 0.3 });
  const howItWorksControls = useAnimation();
  const whyChooseControls = useAnimation();

  useEffect(() => {
    if (howItWorksInView) {
      howItWorksControls.start("visible");
    }
  }, [howItWorksInView, howItWorksControls]);

  useEffect(() => {
    if (whyChooseInView) {
      whyChooseControls.start("visible");
    }
  }, [whyChooseInView, whyChooseControls]);

  return (
    <div>
      <section
        ref={howItWorksRef}
        className="bg-gradient-to-r from-blue-400 via-purple-800 to-green-400 px-6 py-12"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={gridVariants}
            initial="hidden"
            animate={howItWorksControls}
          >
            {steps.map((step) => (
              <motion.div
                key={step.id}
                variants={cardVariants}
                whileHover="hover"
                className="border-r-2 border-gray-300 p-6 rounded-lg shadow-2xl transform transition duration-300 hover:-translate-y-3 hover:shadow-lg hover:bg-blue-200"
              >
                <img
                  src={step.icon}
                  alt={step.title}
                  className="w-16 h-16 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                <p className="text-gray-800 mt-2">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section ref={whyChooseRef} className="py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Choose PieceWork?</h2>
          <motion.div
            className="grid md:grid-cols-3 gap-12"
            variants={gridVariants}
            initial="hidden"
            animate={whyChooseControls}
          >
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="flex flex-col items-center px-3"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="text-white"
                >
                  <path
                    d="M12 0L24 12L12 24L0 12L12 0Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Earnings</h3>
              <p className="px-3">
                Earn at your own pace by completing simple micro-tasks that fit your schedule.
              </p>
            </motion.div>
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="flex flex-col items-center px-3"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="text-white"
                >
                  <path
                    d="M12 0L24 12L12 24L0 12L12 0Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Trustworthy Platform</h3>
              <p className="px-3">
                We ensure all tasks are legitimate, so you can work with confidence and security.
              </p>
            </motion.div>
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="flex flex-col items-center px-3"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="text-white"
                >
                  <path
                    d="M12 0L24 12L12 24L0 12L12 0Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Payments</h3>
              <p className="px-3">
                Get paid quickly and securely upon task completion.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;