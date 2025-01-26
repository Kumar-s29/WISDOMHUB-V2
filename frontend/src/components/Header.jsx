import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10">
      {/* ......left side........ */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl ls:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Book Session <br />
          With Trusted Mentors
        </p>
        <p className="text-white text-sm font-light">
          Simply browse through our extensive list of trusted mentors,
          <br className="hidden sm:block" />
          schedule your session hassle-free.
        </p>
        <img
          className="w-28"
          src={assets.group_profiles}
          alt="Group Profiles"
        />
        <a
          href="#speciality"
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-3xl text-gray-600 text-sm hover:scale-105 transition-all duration-300"
        >
          Book Session
          <img className="w-3" src={assets.arrow_icon} alt="Arrow Icon" />
        </a>
      </div>
      {/* {......Right Side.......} */}
      <div className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={assets.header_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
