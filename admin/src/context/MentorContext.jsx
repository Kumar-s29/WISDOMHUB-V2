import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const MentorContext = createContext();

const MentorContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [mToken, setMToken] = useState(
    localStorage.getItem("mToken") ? localStorage.getItem("mToken") : ""
  );
  const [appointments, setAppointments] = useState([]);

  const [dashData, setDashData] = useState(false);

  const [profileData, setProfileData] = useState(false);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}mentor/appointments`, {
        headers: {
          Authorization: `Bearer ${mToken}`,
        },
      });
      if (data.success) {
        setAppointments(data.appointment);
        console.log(data.appointments.reverese());
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}mentor/complete-appointment`,
        {
          appointmentId,
        },
        {
          headers: {
            Authorization: `Bearer ${mToken}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}mentor/cancel-appointment`,
        {
          appointmentId,
        },
        {
          headers: {
            Authorization: `Bearer ${mToken}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}mentor/dashboard`, {
        headers: {
          Authorization: `Bearer ${mToken}`,
        },
      });
      if (data.success) {
        console.log(data.dashData);

        setDashData(data.dashData);
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const getProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}mentor/profile`, {
        headers: {
          Authorization: `Bearer ${mToken}`,
        },
      });
      if (data.success) {
        console.log(data.profileData);

        setProfileData(data.profileData);
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const value = {
    mToken,
    setMToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashData,
    setDashData,
    getDashData,
    profileData,
    setProfileData,
    getProfileData,
  };
  return (
    <MentorContext.Provider value={value}>{children}</MentorContext.Provider>
  );
};

export default MentorContextProvider;
