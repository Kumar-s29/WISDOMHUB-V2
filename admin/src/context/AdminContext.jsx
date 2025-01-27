import { createContext, useState } from "react";

// Create the AdminContext
export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  // State for managing admin token
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");

  // Environment variable for backend URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Value to provide via context
  const value = {
    aToken,
    setAToken,
    backendUrl,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
