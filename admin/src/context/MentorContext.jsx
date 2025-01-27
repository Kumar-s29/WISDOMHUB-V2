import { createContext } from "react";
export const MentorContext = createContext();

const MentorContextProvider = ({ children }) => {
  const value = {};
  return (
    <MentorContext.Provider value={value}>{children}</MentorContext.Provider>
  );
};

export default MentorContextProvider;
