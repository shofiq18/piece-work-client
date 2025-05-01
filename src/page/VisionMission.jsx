// import React from "react";
// import { FaRocket, FaHandHoldingHeart, FaLightbulb } from "react-icons/fa";

// const VisionMission = () => {
//   return (
//     <section className=" px-6 py-16">
//       <div className="max-w-7xl mx-auto ">
//         <h2 className="text-4xl font-bold text-center mb-8 ">
//           Our Vision & Mission
//         </h2>
//         <p className="text-center text-lg mb-12 ">
//           Empowering individuals and businesses through innovation, trust, and
//           collaboration. Here's what we strive to achieve:
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Vision Section */}
//           <div className="text-center border shadow-md rounded-lg p-6">
//             <div className="text-blue-500 text-5xl mx-auto mb-4">
//               <FaRocket />
//             </div>
//             <h3 className="text-xl font-semibold mb-2 ">
//               Vision
//             </h3>
//             <p className="">
//               To become the leading platform connecting workers and buyers
//               globally, enabling mutual growth and success.
//             </p>
//           </div>

//           {/* Mission Section */}
//           <div className="text-center border  shadow-md rounded-lg p-6">
//             <div className="text-green-500 text-5xl mx-auto mb-4">
//               <FaHandHoldingHeart />
//             </div>
//             <h3 className="text-xl font-semibold mb-2 ">
//               Mission
//             </h3>
//             <p className="">
//               Our mission is to provide a secure, user-friendly environment
//               where tasks are completed efficiently and earnings are rewarded
//               fairly.
//             </p>
//           </div>

//           {/* Values Section */}
//           <div className="text-center border  shadow-md rounded-lg p-6">
//             <div className="text-yellow-500 text-5xl mx-auto mb-4">
//               <FaLightbulb />
//             </div>
//             <h3 className="text-xl font-semibold mb-2 ">
//               Core Values
//             </h3>
//             <p className="">
//               Innovation, trust, and collaboration are at the heart of
//               everything we do. We believe in empowering individuals to succeed.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default VisionMission;
import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { FaRocket, FaHandHoldingHeart, FaLightbulb } from "react-icons/fa";

// Variants for section
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, when: "beforeChildren", staggerChildren: 0.2 },
  },
};

// Variants for title and description
const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

// Variants for Vision card (slide from left)
const visionCardVariants = {
  hidden: { opacity: 0, x: -100, rotate: -5 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
  hover: {
    scale: 1.05,
    rotate: 2,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

// Variants for Mission card (scale up)
const missionCardVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, type: "spring", stiffness: 150, damping: 15 },
  },
  hover: {
    y: -10,
    boxShadow: "0px 10px 20px rgba(0, 255, 0, 0.3)",
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

// Variants for Core Values card (slide from right)
const coreValuesCardVariants = {
  hidden: { opacity: 0, x: 100, rotate: 5 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
  hover: {
    scale: 1.05,
    rotate: [0, 3, -3, 2, -2, 0],
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

// Variants for icons
const iconVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.6 } },
  hover: {
    scale: 1.2,
    rotate: 360,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const VisionMission = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.section
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={controls}
      className="px-6 py-16"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          variants={textVariants}
          className="text-4xl font-bold text-center mb-8"
        >
          Our Vision & Mission
        </motion.h2>
        <motion.p
          variants={textVariants}
          className="text-center text-lg mb-12"
        >
          Empowering individuals and businesses through innovation, trust, and
          collaboration. Here's what we strive to achieve:
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Vision Section */}
          <motion.div
            variants={visionCardVariants}
            whileHover="hover"
            className="text-center border shadow-md rounded-lg p-6"
          >
            <motion.div
              variants={iconVariants}
              className="text-blue-500 text-5xl mx-auto mb-4"
            >
              <FaRocket />
            </motion.div>
            <motion.h3
              variants={textVariants}
              className="text-xl font-semibold mb-2"
            >
              Vision
            </motion.h3>
            <motion.p variants={textVariants}>
              To become the leading platform connecting workers and buyers
              globally, enabling mutual growth and success.
            </motion.p>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            variants={missionCardVariants}
            whileHover="hover"
            className="text-center border shadow-md rounded-lg p-6"
          >
            <motion.div
              variants={iconVariants}
              className="text-green-500 text-5xl mx-auto mb-4"
            >
              <FaHandHoldingHeart />
            </motion.div>
            <motion.h3
              variants={textVariants}
              className="text-xl font-semibold mb-2"
            >
              Mission
            </motion.h3>
            <motion.p variants={textVariants}>
              Our mission is to provide a secure, user-friendly environment where
              tasks are completed efficiently and earnings are rewarded fairly.
            </motion.p>
          </motion.div>

          {/* Core Values Section */}
          <motion.div
            variants={coreValuesCardVariants}
            whileHover="hover"
            className="text-center border shadow-md rounded-lg p-6"
          >
            <motion.div
              variants={iconVariants}
              className="text-yellow-500 text-5xl mx-auto mb-4"
            >
              <FaLightbulb />
            </motion.div>
            <motion.h3
              variants={textVariants}
              className="text-xl font-semibold mb-2"
            >
              Core Values
            </motion.h3>
            <motion.p variants={textVariants}>
              Innovation, trust, and collaboration are at the heart of everything
              we do. We believe in empowering individuals to succeed.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default VisionMission;