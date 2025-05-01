
import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

// Variants for the container
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, when: "beforeChildren", staggerChildren: 0.2 },
  },
};

// Variants for the title
const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Variants for worker cards (left and right)
const cardVariantsLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const cardVariantsRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

// Variants for card content (image and text)
const contentVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  hover: {
    scale: 1.05,
    rotate: 2,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

// Variants for profile image
const imageVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } },
  hover: { scale: 1.1, transition: { type: "spring", stiffness: 400, damping: 15 } },
};

// Variants for text
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  hover: { y: -5, transition: { duration: 0.2 } },
};

// Variants for overlay
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0 },
  hover: { opacity: 0.2, transition: { duration: 0.3 } },
};

const BestWorkers = () => {
  const [topWorkers, setTopWorkers] = useState([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 }); // Trigger when 30% of section is visible
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    const fetchTopWorkers = async () => {
      try {
        const response = await fetch("https://piece-work-server.vercel.app/top-workers");
        const data = await response.json();
        setTopWorkers(data);
      } catch (error) {
        console.error("Error fetching top workers:", error);
      }
    };

    fetchTopWorkers();
  }, []);

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.h2
        variants={titleVariants}
        className="text-4xl font-extrabold text-center mb-12"
      >
        🌟 Best Workers 🌟
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {topWorkers.map((worker, index) => (
          <motion.div
            key={worker._id}
            variants={index % 2 === 0 ? cardVariantsRight : cardVariantsLeft} // Even indices from right, odd from left
            className={`relative group bg-gradient-to-r ${
              index % 2 === 0
                ? "from-indigo-900 via-purple-600 to-pink-200"
                : "from-teal-500 via-blue-500 to-indigo-600"
            } p-6 rounded-xl shadow-xl overflow-hidden`}
            whileHover="hover"
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-white to-transparent rounded-xl blur opacity-70"
              animate={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            ></motion.div>
            <motion.div
              variants={contentVariants}
              className="relative z-10 text-center"
            >
              <motion.img
                src={worker.photo || "https://via.placeholder.com/150"}
                alt={worker.name}
                variants={imageVariants}
                className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
              />
              <motion.h3
                variants={textVariants}
                className="text-xl font-bold text-white text-shadow-md"
              >
                {worker.name}
              </motion.h3>
              <motion.p
                variants={textVariants}
                className="text-white text-sm mt-2"
              >
                Available Coins: <span className="font-semibold">{worker.coins}</span>
              </motion.p>
            </motion.div>
            {/* Hover Overlay Effect */}
            <motion.div
              variants={overlayVariants}
              className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black rounded-xl"
            ></motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BestWorkers;