import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddMentor from "./pages/Admin/AddMentor";
import MentorsList from "./pages/Admin/MentorsList";
import { MentorContext } from "./context/MentorContext";
import MentorDashboard from "./pages/Mentor/MentorDashboard";
import MentorAppointments from "./pages/Mentor/MentorAppointments";
import MentorProfile from "./pages/Mentor/MentorProfile";
const App = () => {
  const { aToken } = useContext(AdminContext);
  // Destructure 'aToken' from context
  const { mToken } = useContext(MentorContext);

  return aToken || mToken ? (
    <div className="bg-[#F8F9F0]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        {/* Sidebar */}
        {<Sidebar />}
        <Routes>
          {/* Admin Route */}
          <Route path="/" element={<div></div>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-apponitments" element={<AllAppointments />} />
          <Route path="/add-mentor" element={<AddMentor />} />
          <Route path="mentor-list" element={<MentorsList />} />
          {/* Mentor Route */}
          <Route path="/mentor-dashboard" element={<MentorDashboard />} />
          <Route path="/mentor-appointments" element={<MentorAppointments />} />
          <Route path="/mentor-profile" element={<MentorProfile />} />
        </Routes>
      </div>

      {/* Add any other components or content to display after login */}
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
