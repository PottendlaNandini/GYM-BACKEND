import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { sendEmail } from "./utils/sendEmail.js";

config({ path: "./config.env" });  // Load env first

const app = express();              // Create app FIRST

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
   cors({ 
   origin: "https://gmail-website-frontend.vercel.app",
   methods: ["POST"],
   credentials: true,
   }) 
);


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

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});