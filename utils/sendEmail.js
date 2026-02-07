import nodeMailer from "nodemailer";

export const sendEmail = async (options) => {
  console.log("📨 Trying to send email...");
   const { toEmail, subject, message, userEmail } = options;

  const transporter = nodeMailer.createTransport({
    service: process.env.SMTP_SERVICE, // gmail
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: toEmail, // where YOU will receive email
    subject,
    text: `${message}\n\nSender Email: ${userEmail}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
  } catch (error) {
    console.log("❌ Email error:", error.message);
    throw error;
  }
};





  

  
