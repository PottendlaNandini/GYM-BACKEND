import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { sendEmail } from "./utils/sendEmail.js";

config();  // Load env first

const app = express();              // Create app FIRST

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 4000;
app.use(
   cors({ 
   origin: "https://gym-frontend-peach.vercel.app",  
    methods: ["GET", "POST"],
    credentials: true,
   }) 
);
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

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
      email: "pottendlanandini1@gmail.com",
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

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});