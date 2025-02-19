import React, { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulating form submission
        setTimeout(() => {
            setSuccessMessage("Your message has been sent successfully!");
            setIsSubmitting(false);
            setFormData({ name: "", email: "", message: "" });
        }, 2000);
    };

    return (
        <div className="bg-gray-100">
            {/* Hero Section */}
            <section className="bg-blue-600 text-white py-20 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contact Us</h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto">
                    We’d love to hear from you! Feel free to reach out with any questions, feedback, or inquiries.
                </p>
            </section>

            {/* Contact Form Section */}
            <section className="py-16 px-6 md:px-20">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-blue-600 text-center mb-8">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Input */}
                        <div>
                            <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="mt-2 p-3 w-full border rounded-md bg-white shadow-sm"
                                placeholder="Enter your name"
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-2 p-3 w-full border rounded-md bg-white shadow-sm"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Message Textarea */}
                        <div>
                            <label htmlFor="message" className="block text-lg font-medium text-gray-700">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="6"
                                className="mt-2 p-3 w-full border rounded-md bg-white shadow-sm"
                                placeholder="Write your message"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                            >
                                {isSubmitting ? "Submitting..." : "Send Message"}
                            </button>
                        </div>
                    </form>

                    {successMessage && (
                        <div className="mt-6 text-center text-green-600">
                            <p>{successMessage}</p>
                        </div>
                    )}
                </div>
            </section>

   
        </div>
    );
};

export default Contact;
