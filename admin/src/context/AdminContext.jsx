import { createContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";

// Create the AdminContext
export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  // State for managing admin token
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const [mentors, setMentors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);

  // Environment variable for backend URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllmentors = async () => {
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
        setMentors(data.doctors);
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
        getAllmentors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const getAllappointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}admin/appointments`,

        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );

      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}admin/cancel-appointment`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getAllappointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "admin/dashboard", {
        headers: {
          aToken,
        },
      });
      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.", error.message);
    }
  };
  // Value to provide via context
  const value = {
    aToken,
    setAToken,
    backendUrl,
    mentors,
    getAllmentors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllappointments,
    cancelAppointment,
    dashData,
    getDashData,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
