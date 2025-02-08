import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currency = "$";

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };

  const [appointments, setAppointments] = useState([]);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const navigate = useNavigate();

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      // API call to cancel appointment (if backend is integrated)
      setAppointments((prev) =>
        prev.filter((appointment) => appointment.id !== appointmentId)
      );
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  const value = {
    currency,
    calculateAge,
    slotDateFormat,
    cancelAppointment,
    appointments,
    setAppointments,
    navigate,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
