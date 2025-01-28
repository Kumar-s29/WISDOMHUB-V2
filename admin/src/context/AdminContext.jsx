import { createContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";

// Create the AdminContext
export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  // State for managing admin token
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const [doctors, setDoctors] = useState([]);

  // Environment variable for backend URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllMentors = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}admin/all-mentors`,
        {}, // Empty body if not required
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );

      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}admin/change-availability`,
        { docId },
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAllMentors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    }
  };
  // Value to provide via context
  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllMentors,
    changeAvailability,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
