import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          About <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Welcome to Wisdom Hub, your go-to platform for connecting
            experienced mentors with eager learners. At Wisdom Hub, we celebrate
            the wealth of knowledge that retirees and skilled professionals have
            to offer, creating a space where wisdom meets curiosity.
          </p>
          <p>
            Wisdom Hub is dedicated to empowering individuals through
            skill-sharing and mentorship. Whether you’re a mentor passionate
            about passing on your expertise or a learner eager to acquire new
            skills, our platform provides the tools to make the exchange
            seamless and rewarding. Our Vision
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            Our vision at Wisdom Hub is to build a vibrant community where
            knowledge flows freely across generations. By bridging the gap
            between mentors and learners, we aim to inspire growth, foster
            meaningful connections, and create a lasting impact on personal and
            professional journeys.
          </p>
        </div>
      </div>
      <div>
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>EFFICIENCY:</b>
          <p>
            Streamlined session scheduling that fits into your busy lifestyle.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>CONVENIENCE:</b>
          <p>Access to a network of trusted professionals in your area.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px]  hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>PERSONALIZATION:</b>
          <p>
            Tailored recommendations and reminders to help you stay on top of
            your Life.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
