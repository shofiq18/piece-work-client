
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useAnimation } from "framer-motion";

// Variants for footer container
const footerVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, when: "beforeChildren", staggerChildren: 0.2 },
  },
};

// Variants for text elements (description, headings, copyright)
const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

// Variants for background decorative circles
const circleVariants = {
  hidden: { scale: 0.8, opacity: 0.05 },
  visible: {
    scale: [0.8, 1.2, 0.8],
    opacity: [0.05, 0.15, 0.05],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

// Variants for brand section
const brandVariants = {
  hidden: { opacity: 0, x: -100, rotate: -5 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
  hover: {
    scale: 1.05,
    textShadow: "0px 0px 8px rgba(0, 255, 0, 0.5)",
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

// Variants for quick links
const linkListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: 20, rotate: 3 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
  hover: {
    y: -5,
    color: "#4ADE80",
    transition: { duration: 0.3 },
  },
};

const underlineVariants = {
  hidden: { width: 0 },
  visible: { width: 0 },
  hover: {
    width: "100%",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

// Variants for social media icons
const socialVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, type: "spring", stiffness: 150, damping: 15 },
  },
  hover: {
    scale: 1.2,
    rotate: 15,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

// Variants for footer bottom
const bottomVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

const Footer = ({ user }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={footerVariants}
      initial="hidden"
      animate={controls}
      className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-12 relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          variants={circleVariants}
          initial="hidden"
          animate="visible"
          className="absolute top-0 left-0 w-64 h-64 bg-green-500 opacity-10 rounded-full filter blur-3xl"
        />
        <motion.div
          variants={circleVariants}
          initial="hidden"
          animate="visible"
          className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 opacity-10 rounded-full filter blur-3xl"
        />
      </div>

      <motion.footer
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10"
        variants={footerVariants}
      >
        {/* Brand Section */}
        <motion.aside
          variants={brandVariants}
          whileHover="hover"
          className="space-y-4"
        >
          <p className="flex items-center space-x-2">
            <motion.span
              className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
              variants={brandVariants}
            >
              PieceWork
            </motion.span>
          </p>
          <motion.p
            variants={textVariants}
            className="text-gray-300 text-sm leading-relaxed"
          >
            Empowering productivity through micro-tasks and seamless earning opportunities.
          </motion.p>
        </motion.aside>

        {/* Quick Links */}
        <motion.nav
          variants={linkListVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.h6
            variants={textVariants}
            className="text-xl font-semibold text-green-400"
          >
            Quick Links
          </motion.h6>
          <motion.ul
            variants={linkListVariants}
            className="space-y-3"
          >
            {[
              { to: "/dashboard", label: "Dashboard" },
              { to: "/", label: "Available Coin" },
              { to: "/user-profile", label: "User Profile" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact Us" },
            ].map((link, index) => (
              <motion.li
                key={index}
                variants={linkVariants}
                whileHover="hover"
              >
                <Link
                  to={link.to}
                  className="text-gray-300 relative group"
                >
                  {link.label}
                  <motion.span
                    variants={underlineVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="absolute left-0 bottom-0 h-0.5 bg-green-400"
                  />
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </motion.nav>

        {/* Social Media Links */}
        <motion.nav
          variants={linkListVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.h6
            variants={textVariants}
            className="text-xl font-semibold text-green-400"
          >
            Connect With Us
          </motion.h6>
          <motion.div
            variants={linkListVariants}
            className="flex space-x-4"
          >
            {[
              {
                href: "https://www.linkedin.com/in/md-shofiqul-islam-saad/",
                bg: "bg-blue-700",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current text-white"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.5c-.966 0-1.5-.679-1.5-1.5s.534-1.5 1.5-1.5c.966 0 1.5.679 1.5 1.5s-.534 1.5-1.5 1.5zm13.5 11.5h-3v-5.604c0-1.336-.477-2.25-1.673-2.25-.912 0-1.452.637-1.69 1.252-.087.211-.109.504-.109.799v5.803h-3s.04-9.409 0-10.391h3v1.473c.398-.615 1.111-1.492 2.705-1.492 1.976 0 3.467 1.291 3.467 4.066v6.344z" />
                  </svg>
                ),
              },
              {
                href: "https://github.com/shofiq18",
                bg: "bg-gray-900",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current text-white"
                  >
                    <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.762-1.605-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.468-2.382 1.236-3.222-.123-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.654 1.653.241 2.873.118 3.176.77.84 1.234 1.912 1.234 3.222 0 4.61-2.807 5.624-5.479 5.922.43.371.814 1.102.814 2.222 0 1.605-.015 2.898-.015 3.292 0 .322.217.694.825.577 4.765-1.585 8.205-6.082 8.205-11.385 0-6.627-5.373-12-12-12z" />
                  </svg>
                ),
              },
              {
                href: "https://www.facebook.com/mdshafiqulislam.shafiq.9659",
                bg: "bg-blue-600",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current text-white"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                ),
              },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={socialVariants}
                whileHover="hover"
                initial="hidden"
                animate="visible"
                className={`p-3 rounded-full ${social.bg} shadow-lg`}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.nav>
      </motion.footer>

      {/* Footer Bottom */}
      <motion.div
        variants={bottomVariants}
        className="mt-12 border-t border-gray-700 pt-8 text-center"
      >
        <motion.p
          variants={bottomVariants}
          className="text-gray-400 text-sm"
        >
          © {new Date().getFullYear()} PieceWork. All rights reserved.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Footer;