import React, { useState } from "react";

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

  const toggleFAQ = (id) => {
    setActiveFAQ((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <section className="bg-gray-100 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
                onClick={() => toggleFAQ(faq.id)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{faq.question}</h3>
                  <span>
                    {activeFAQ === faq.id ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-600"
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
                  </span>
                </div>
                {activeFAQ === faq.id && (
                  <p className="text-gray-600 mt-4">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16 text-center">
        <div className="max-w-7xl mx-auto px-3">
          <h2 className=" text-2xl md:text-4xl font-bold text-gray-800 mb-6">Join PieceWork Now</h2>
          <p className="text-lg text-gray-600 mb-6">Start completing tasks and earning today! It's free to join, and it only takes a few minutes.</p>
          <a href="/register" className="bg-green-600 text-white px-6 py-3 text-lg rounded-lg hover:bg-green-700 transition-colors">Get Started</a>
        </div>
      </section>


    </div>
  );
};

export default FAQ;
