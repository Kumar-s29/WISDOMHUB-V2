import validator from "validator";
import bycrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
//api for adding doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fee,
      address,
    } = req.body;
    const imageFile = req.file;

    //checking for all data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fee ||
      !address ||
      !imageFile
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    //validating email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ msg: "Invalid Email Please Enter a Valid Email" });
    }

    // validating strong password
    if (password.length < 8) {
      return res
        .status(400)
        .json({ msg: "Password length should be atleast 8 characters" });
    }

    //hashing doctor password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    // upload image to cloudinary
    const uploadImage = await cloudinary.uploader.uploadImage(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = uploadImage.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fee,
      address: JSON.parse(address),
      date: Date.now(),
    };
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    res.status(200).json({ msg: "Doctor added successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

//api for the admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token: token });

      res.status(200).json({ msg: "Admin Login Successfull" });
    } else {
      res.status(400).json({ msg: "Invalid Credentials" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};

//api to getall doctors list for admin panel
const getDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.status(200).json(doctors);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};

// api to get all appointments list
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//api for appointment cacellation
// api to cancel appointment
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    // releasing doctor slot
    const { doctId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(doctId);
    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// api to get dashboard data for admin panel

const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    res.json({ success: true, dashData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export {
  addDoctor,
  loginAdmin,
  getDoctors,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
};
