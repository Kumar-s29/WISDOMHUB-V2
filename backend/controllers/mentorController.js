import { json } from "express";
import mentorModel from "../models/mentorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { menId } = req.body;
    const menData = await mentorModel.findById(menId);
    await mentorModel.findByIdAndUpdate(menId, {
      available: !menData.available,
    });
    res.json({ msg: "Availability changed successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};

const mentorList = async (req, res) => {
  try {
    const mentors = await mentorModel.find({}).select(["-password", "-email"]);
    res.json({
      success: true,
      mentors,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};

// api for mentor login

const loginMentor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const mentor = await mentorModel.findOne({ email });

    if (!mentor) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, mentor.password);
    if (isMatch) {
      const token = jwt.sign({ id: mentor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// api to get mentor appointments for mentor panel
const appointmentsMentor = async (req, res) => {
  try {
    const { menId } = req.body;
    const appointments = await appointmentModel.find({ menId });
    res.json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// api to mark appointment completed
const appointmentComplete = async (req, res) => {
  try {
    const { menId, appointmentId } = req.body;
    const appointmentData = appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.menId == menId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({
        success: true,
        message: "Appointment marked completed",
      });
    } else {
      return res.json({
        success: false,
        message: "Mark appointment completed failed",
      });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// api to cancel appointment for mentor panel
const appointmentCancel = async (req, res) => {
  try {
    const { menId, appointmentId } = req.body;
    const appointmentData = appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.menId == menId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({
        success: true,
        message: "Appointment cancelled",
      });
    } else {
      return res.json({
        success: false,
        message: "Cancellation Failed",
      });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// api to get dashboard data for mentor panel

const mentorDashboard = async (req, res) => {
  try {
    const { menId } = req.body;
    const appointments = await appointmentModel.find({ menId });

    let earnings = 0;
    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });
    let students = [];
    appointments.map((item) => {
      if (students.includes(item.userId)) {
        students.push(item.userId);
      }
    });
    const dashData = {
      earnings,
      appointments: appointments.length,
      students: students.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    res.json({ success: true, dashData });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//api to get mentor profile for mentor panel
const mentorProfile = async (req, res) => {
  try {
    const { menId } = req.body;
    const profileData = await mentorModel.findById(menId).select("-password");
    res.json({ success: true, profileData });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//api to update profile data from mentor panel
const updateMentorProfile = async (req, res) => {
  try {
    const { menId, fees, address, available } = req.body;
    await mentorModel.findByIdAndUpdate(menId, { fees, address, avvailable });
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
export {
  changeAvailability,
  mentorList,
  loginMentor,
  appointmentsMentor,
  appointmentCancel,
  appointmentComplete,
  mentorDashboard,
  mentorProfile,
  updateMentorProfile,
};
