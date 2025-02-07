import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Mentors = () => {
  const { speciality } = useParams();
  const [filterMen, setFilterMen] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterMen(doctors.filter((item) => item.speciality === speciality));
    } else {
      setFilterMen(doctors);
    }
  };

  useEffect(() => {
    if (doctors) {
      applyFilter();
    }
  }, [speciality, doctors]);

  return (
    <div>
      <p className="text-gray-600">Browse through the mentors' specialists.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-primary text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={` flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          {[
            { label: "Technology & IT", value: "General physician" },
            { label: "Health & Wellness", value: "Gynecologist" },
            { label: "Education", value: "Dermatologist" },
            { label: "Career Development", value: "Pediatrician" },
            { label: "Arts & Creativity", value: "Neurologist" },
            { label: "Entrepreneurship", value: "Gastroenterologist" },
          ].map((category) => (
            <p
              key={category.value}
              onClick={() =>
                speciality === category.value
                  ? navigate("/mentors")
                  : navigate(`/mentors/${category.value}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer ${
                speciality === category.value ? "bg-indigo-100 text-black" : ""
              }`}
            >
              {category.label}
            </p>
          ))}
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filterMen.length > 0 ? (
            filterMen.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              >
                <img src={item.image} alt={item.name} className="bg-blue-50 " />
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
                  <p className="text-gray-900 text-lg font-medium">
                    {item.name}
                  </p>
                  <p className="text-gray-600 text-sm">{item.speciality}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-gray-500 text-center">
              No mentors found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mentors;
