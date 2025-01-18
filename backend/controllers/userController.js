import validator from "validator";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay";
import mentorModel from "../models/mentorModel.js";
// api to register a user

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 8 characters" });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // save user to database
    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();
    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//api for user login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// api to get userprofile data
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    return res.json(userData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// API to update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    // Check if all required fields are provided
    if (!userId || !name || !phone || !address || !dob || !gender) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    // Handle image upload if file is provided
    if (imageFile) {
      // Upload image to Cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });

      const imageUrl = imageUpload.secure_url;

      // Update user with the new image URL
      await userModel.findByIdAndUpdate(userId, {
        imageUrl,
      });
    }

    return res.json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// api to book appiontment
const bookAppointment = async (req, res) => {
  try {
    const { userId, menId, slotDate, slotTime } = req.body;
    const menData = await mentorModel.findById(menId).select("-password");
    if (!menData.available) {
      return res.json({
        success: false,
        message: "Mentor not Available",
      });
    }
    let slots_booked = menData.slots_booked;

    // checking for slots availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({
          success: false,
          message: "slot not available",
        });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }
    const userData = await userModel.findById(userId).select("-password");

    delete menData.slots_booked;

    const appointmentData = {
      userId,
      menId,
      userData,
      menData,
      amount: menData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    //save new slots data in menData
    await mentorModel.findByIdAndUpdate(menId, { slots_booked });
    res.json({
      success: true,
      messsage: "Appointment Booked",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//api to get user PPOINTMENTS FOR FRINTEND my-appoint,ments oage

const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentModel.find({ userId });
    res.json({ success: true, appointments });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// api to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    // verify appointment user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    // releasing mentor slot
    const { menId, slotDate, slotTime } = appointmentData;
    const mentorData = await mentorModel.findById(menId);
    let slots_booked = mentorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    await mentorModel.findByIdAndUpdate(menId, { slots_booked });
    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,

  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
// api to make payment of appointment

const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment cancelled or not found",
      });
    }
    // creating option for razorpay payment
    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };
    // creation of an order
    const order = await razorpayInstance.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// api to verify payment of razorpay
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    console.log(orderInfo);
    if (orderInfo.status === "paid") {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: true,
      });
      res.json({ success: true, message: "Payment Successfull" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Exporting the user-related functions
export {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyPayment,
};
