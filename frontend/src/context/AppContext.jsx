import { createContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [mentors, setMentors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );

  // Fetch mentors data
  const getMentorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/mentor/list`);
      if (data.success) {
        setMentors(data.mentors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching mentors:", error);
      toast.error("Failed to fetch mentors.");
    }
  };

  useEffect(() => {
    getMentorsData();
  }, []);

  const value = {
    mentors,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    doctors,
    // Provide mentors in the context
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
