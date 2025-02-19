import React from "react";

const About = () => {
    return (
        <div className="bg-gray-100">
            {/* Hero Section */}
            <section className="bg-green-600 text-white py-20 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Us</h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto">
                    At PieceWork, we provide an easy platform for individuals to earn by completing small tasks in exchange for rewards. 
                    Join us today and get started on your journey to earning!
                </p>
            </section>

            {/* Our Mission Section */}
            <section className="py-16 px-6 text-center md:px-20">
                <h2 className="text-3xl font-bold text-green-600 mb-6">Our Mission</h2>
                <p className="text-xl max-w-3xl mx-auto text-gray-700">
                    Our mission is to empower individuals to earn through micro-tasks while making the process simple and efficient. 
                    PieceWork brings together users looking to complete tasks and those seeking help, offering a win-win environment.
                </p>
            </section>

            {/* Production Label Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl font-bold text-green-600 mb-4">Why Choose PieceWork?</h2>
                            <p className="text-lg text-gray-700 mb-6">
                                PieceWork is designed for both simplicity and reliability. Our easy-to-use platform helps users manage their micro-tasks effectively. 
                                With our fast payouts, clear task instructions, and secure process, we stand out in the field of micro-tasking platforms.
                            </p>
                            <ul className="list-inside list-disc text-left text-lg text-gray-700">
                                <li>Simple Task Management</li>
                                <li>Instant Rewards and Payments</li>
                                <li>Dedicated Support Team</li>
                                <li>Flexible Work Hours</li>
                            </ul>
                        </div>
                        <div className="lg:w-1/2 flex justify-center">
                            {/* Unique Production Label */}
                            <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg w-72 text-center">
                                <h3 className="text-xl font-bold mb-4">Our Promise</h3>
                                <p className="text-md">
                                    PieceWork ensures that every task completed is met with fair pay and top-quality service. 
                                    We guarantee satisfaction for both workers and employers.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
        </div>
    );
};

export default About;
