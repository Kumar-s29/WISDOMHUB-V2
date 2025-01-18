import express from "express";
import {
  appointmentComplete,
  appointmentsMentor,
  mentorDashboard,
  mentorList,
  mentorProfile,
  loginMentor,
  updateMentorProfile,
} from "../controllers/mentorController.js";
import authMentor from "../middlewares/authMentor.js";
import { appointmentCancel } from "../controllers/adminController.js";

const mentorRouter = express.Router();

mentorRouter.get("/list", mentorList);
mentorRouter.post("/login", loginMentor);
mentorRouter.get("/appointments", authMentor, appointmentsMentor);
mentorRouter.post("/complete-appointment", authMentor, appointmentComplete);
mentorRouter.post("/cancel-appointment", authMentor, appointmentCancel);
mentorRouter.get("/dashboard", authMentor, mentorDashboard);
mentorRouter.get("/profile", authMentor, mentorProfile);
mentorRouter.post("/update-profile", authMentor, updateMentorProfile);

export default mentorRouter;
