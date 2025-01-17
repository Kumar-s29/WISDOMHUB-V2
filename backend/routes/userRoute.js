import express from "express";

import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyPayment,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("get-profile", authUser, getUserProfile);
userRouter.post(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateUserProfile
);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);
userRouter.post("/payment-razorpay", authUser, paymentRazorpay);
userRouter.post("/verifyRazorpay", authUser, verifyPayment);
export default userRouter;
