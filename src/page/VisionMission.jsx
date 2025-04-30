import React from "react";
import { FaRocket, FaHandHoldingHeart, FaLightbulb } from "react-icons/fa";

const VisionMission = () => {
  return (
    <section className=" px-6 py-16">
      <div className="max-w-7xl mx-auto ">
        <h2 className="text-4xl font-bold text-center mb-8 ">
          Our Vision & Mission
        </h2>
        <p className="text-center text-lg mb-12 ">
          Empowering individuals and businesses through innovation, trust, and
          collaboration. Here's what we strive to achieve:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Vision Section */}
          <div className="text-center border shadow-md rounded-lg p-6">
            <div className="text-blue-500 text-5xl mx-auto mb-4">
              <FaRocket />
            </div>
            <h3 className="text-xl font-semibold mb-2 ">
              Vision
            </h3>
            <p className="">
              To become the leading platform connecting workers and buyers
              globally, enabling mutual growth and success.
            </p>
          </div>

          {/* Mission Section */}
          <div className="text-center border  shadow-md rounded-lg p-6">
            <div className="text-green-500 text-5xl mx-auto mb-4">
              <FaHandHoldingHeart />
            </div>
            <h3 className="text-xl font-semibold mb-2 ">
              Mission
            </h3>
            <p className="">
              Our mission is to provide a secure, user-friendly environment
              where tasks are completed efficiently and earnings are rewarded
              fairly.
            </p>
          </div>

          {/* Values Section */}
          <div className="text-center border  shadow-md rounded-lg p-6">
            <div className="text-yellow-500 text-5xl mx-auto mb-4">
              <FaLightbulb />
            </div>
            <h3 className="text-xl font-semibold mb-2 ">
              Core Values
            </h3>
            <p className="">
              Innovation, trust, and collaboration are at the heart of
              everything we do. We believe in empowering individuals to succeed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
