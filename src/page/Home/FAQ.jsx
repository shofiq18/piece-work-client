
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

// Variants for sections
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

// Variants for FAQ cards (left and right slide)
const faqCardVariantsLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
  hover: {
    scale: 1.03,
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

const faqCardVariantsRight = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
  hover: {
    scale: 1.03,
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

// Variants for FAQ answer
const answerVariants = {
  hidden: { opacity: 0, y: -20, height: 0 },
  visible: {
    opacity: 1,
    y: 0,
    height: "auto",
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

// Variants for toggle icon
const iconVariants = {
  closed: { rotate: 0 },
  open: { rotate: 180, transition: { duration: 0.3 } },
};

// Variants for Join button
const buttonVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, type: "spring", stiffness: 150, damping: 15 },
  },
  hover: {
    scale: 1.1,
    boxShadow: "0px 8px 16px rgba(0, 255, 0, 0.3)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const faqs = [
  {
    id: 1,
    question: "How do I earn coins?",
    answer:
      "Complete tasks posted by Buyers, and coins will be credited to your account upon approval.",
  },
  {
    id: 2,
    question: "What is the minimum withdrawal amount?",
    answer:
      "You need at least 200 coins (equivalent to $10) to make a withdrawal.",
  },
  {
    id: 3,
    question: "How do I post a task?",
    answer:
      "Sign up as a Buyer, navigate to the Dashboard, and click on 'Add New Task' to get started.",
  },
];

const FAQ = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const faqRef = useRef(null);
  const joinRef = useRef(null);
  const faqInView = useInView(faqRef, { once: true, amount: 0.3 });
  const joinInView = useInView(joinRef, { once: true, amount: 0.3 });
  const faqControls = useAnimation();
  const joinControls = useAnimation();

  const toggleFAQ = (id) => {
    setActiveFAQ((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (faqInView) {
      faqControls.start("visible");
    }
  }, [faqInView, faqControls]);

  useEffect(() => {
    if (joinInView) {
      joinControls.start("visible");
    }
  }, [joinInView, joinControls]);

  return (
    <div>
      <motion.section
        ref={faqRef}
        variants={sectionVariants}
        initial="hidden"
        animate={faqControls}
        className="px-6 py-12"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={textVariants}
            className="text-3xl font-bold text-center mb-12"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                variants={index % 2 === 0 ? faqCardVariantsRight : faqCardVariantsLeft}
                whileHover="hover"
                className="border p-6 rounded-lg shadow-md cursor-pointer"
                onClick={() => toggleFAQ(faq.id)}
              >
                <div className="flex justify-between items-center">
                  <motion.h3
                    variants={textVariants}
                    className="text-xl font-semibold"
                  >
                    {faq.question}
                  </motion.h3>
                  <motion.span
                    animate={activeFAQ === faq.id ? "open" : "closed"}
                    variants={iconVariants}
                  >
                    {activeFAQ === faq.id ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </motion.span>
                </div>
                <motion.div
                  variants={answerVariants}
                  initial="hidden"
                  animate={activeFAQ === faq.id ? "visible" : "hidden"}
                >
                  {activeFAQ === faq.id && <p className="mt-4">{faq.answer}</p>}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={joinRef}
        variants={sectionVariants}
        initial="hidden"
        animate={joinControls}
        className="py-16 text-center"
      >
        <div className="max-w-7xl mx-auto px-3">
          <motion.h2
            variants={textVariants}
            className="text-2xl md:text-4xl font-bold mb-6"
          >
            Join PieceWork Now
          </motion.h2>
          <motion.p
            variants={textVariants}
            className="text-lg mb-6"
          >
            Start completing tasks and earning today! It's free to join, and it only takes a few minutes.
          </motion.p>
          <motion.a
            href="/register"
            variants={buttonVariants}
            whileHover="hover"
            className="bg-green-600 text-white px-6 py-3 text-lg rounded-lg hover:bg-green-700 transition-colors"
          >
            Get Started
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
};

export default FAQ;