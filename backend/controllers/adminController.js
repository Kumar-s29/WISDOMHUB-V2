import validator from "validator";
import bycrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
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

export { addDoctor };
