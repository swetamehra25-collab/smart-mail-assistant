import express from "express";
import transporter from "../config/mailer.js";
import Email from "../models/Email.js";

const router = express.Router();

router.post("/send", async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    console.log("Checking credentials before sending:");
    console.log("User:", Boolean(process.env.EMAIL_USER));
    console.log("Password:", Boolean(process.env.EMAIL_PASS));


    // Send actual email using Gmail
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: message,
    });

    // Save email details in MongoDB
    const newEmail = await Email.create({
      from: process.env.EMAIL_USER,
      to,
      subject,
      message,
    });

    // Get Socket.IO instance
const io = req.app.get("io");
console.log("Socket notification emitting...");

// Send real-time notification
io.emit("newEmail", {
  message: "Your email has been sent successfully!",
  subject: subject,
  emailMessage: message
  
});

    res.status(201).json({
      success: true,
      message: "Email sent successfully!",
      email: newEmail,
    });
  } catch (error) {
    console.log("Email sending error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// Get all saved emails for Inbox
router.get("/", async (req, res) => {
  try {
    const emails = await Email.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: emails.length,
      emails: emails
    });

  } catch (error) {
    console.log("Fetching emails error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch emails"
    });
  }
});


export default router;
