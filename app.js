import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { sendEmail } from "./utils/sendEmail.js";
import serverless from "serverless-http";

config({ path: "./config.env" });

  // Load env first

const app = express();              // Create app FIRST

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
   cors({ 
   origin: process.env.FRONTEND_URL || "*",
   methods: ["POST"],
   credentials: true,
   }) 
);

app.get("/", (req, res) => res.send("Backend is running!"));
app.post("/send/mail", async (req, res) => {
  console.log("BODY RECEIVED =>", req.body);

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide all details",
    });
  }

  try {
    await sendEmail({
      toemail: "pottendlanandini1@gmail.com",
      subject: "GYM WEBSITE CONTACT",
      message,
      userEmail: email,
    });

    res.status(200).json({
      success: true,
      message: "Message Sent Successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});



export default serverless(app);