
/*
import nodeMailer from "nodemailer";

export const sendEmail = async (options) => {
  console.log("📨 Trying to send email...");

  const transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // VERY IMPORTANT (false for 587)
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email, // where YOU will receive email
    subject: options.subject,
    text: `${options.message}\n\nSender Email: ${options.userEmail}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
  } catch (error) {
    console.log("❌ Email error:", error.message);
  }
};
*/


/*

import nodemailer from "nodemailer";
import postmark from "postmark";

// Create Postmark client
const postmarkClient = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

// Create Nodemailer transporter using Postmark transport
const transporter = nodemailer.createTransport({
  // Use Postmark transport via HTTPS API
  jsonTransport: false,
  send: async (mail, callback) => {
    try {
      const message = {
        From: mail.from.value[0].address,
        To: mail.to.value.map((t) => t.address).join(","),
        Subject: mail.subject,
        TextBody: mail.text,
      };
      await postmarkClient.sendEmail(message);
      callback(null, { response: "Email sent via Postmark" });
    } catch (err) {
      callback(err);
    }
  },
});

export const sendEmail = async (options) => {
  console.log("📨 Trying to send email...");

  const mailOptions = {
    from: "no-reply@yourgym.com",     // must be verified in Postmark
    to: options.email,                // recipient
    subject: options.subject,
    text: `${options.message}\n\nSender Email: ${options.userEmail}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
  } catch (error) {
    console.log("❌ Email error:", error.message);
    throw error;
  }
};
*/

/*
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Gym Website" <${process.env.SMTP_USER}>`,
    to: email,
    subject,
    text: message,
  });

  console.log("✅ Email sent");
};

*/
import axios from "axios";

export const sendEmail = async ({ email, subject, message }) => {
  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Gym Website",
          email: "no-reply@gymapp.com" // can be anything
        },
        to: [
          {
            email: email
          }
        ],
        subject: subject,
        textContent: message
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ Email sent via Brevo API");
  } catch (error) {
    console.error(
      "❌ Brevo API error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
