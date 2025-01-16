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
    return (
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">{faq.question}</h3>
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  export default FAQ;
  