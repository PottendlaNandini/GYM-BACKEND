import nodeMailer from "nodemailer";

export const sendEmail = async (options) => {
  console.log("📨 Trying to send email...");

 




  const transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // VERY IMPORTANT (false for 587)
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
