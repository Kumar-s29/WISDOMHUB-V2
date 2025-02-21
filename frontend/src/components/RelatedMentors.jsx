import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedMentors = ({ speciality, menId }) => {
  const { mentors } = useContext(AppContext);
  const [relMen, setrelMen] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (mentors.length > 0 && speciality) {
      const mentorsData = mentors.filter(
        (men) => men.speciality === speciality && men._id !== menId
      );
      setrelMen(mentorsData);
    }
  }, [mentors, speciality, menId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Mentors</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simple browse through our extensive list of trusted Mentors
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relMen.slice(0, 5).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            key={index}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            <img className="bg-blue-50" src={item.image} alt="" />
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm text-center ${
                  item.available ? "text-green-500" : "text-gray-500"
                } `}
              >
                <p
                  className={`w-2 h-2 ${
                    item.available ? " bg-green-500" : "bg-gray-500"
                  } rounded-full`}
                ></p>
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10">
        more
      </button>
    </div>
  );
};

export default RelatedMentors;
