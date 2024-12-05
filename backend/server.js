import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

//app config
const app = express();
const port = process.env.PORT || 4000;

//middlewares
app.use(express.json());
app.use(cors());

//api end point
app.get("/", (req, res) => {
  res.send("Hello World! This is the backend server");
});

app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});
