import React from "react";
import { useContext } from "react";
import { MentorContext } from "../../context/MentorContext";
import { useEffect } from "react";

const MentorAppointments = () => {
  const { dToken, appointments, getAppointments } = useContext(MentorContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-whiteborder rounded text-sm  max-h-[80vh] min-h-[50vh] overflow-y-scroll ">
        <div className="max-sm:hidden  grid grid-cols-[0.5fr_2fr_1fr__1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>date & Time</p>
          <p>Fee</p>
          <p>Action</p>
        </div>
      </div>
    </div>
  );
};

export default MentorAppointments;
