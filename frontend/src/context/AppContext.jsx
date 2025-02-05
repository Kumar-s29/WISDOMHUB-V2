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

  const [userData, setUserData] = useState(false);

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

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: {
          token,
        },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    mentors,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    doctors,
    userData,
    setUserData,
    loadUserProfileData,
    getMentorsData,
    // Provide mentors in the context
  };
  useEffect(() => {
    getMentorsData();
  }, []);
  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
