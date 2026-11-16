import "dotenv/config";
import nodemailer from "nodemailer";

console.log("EMAIL_USER loaded:", Boolean(process.env.EMAIL_USER));
console.log("EMAIL_PASS loaded:", Boolean(process.env.EMAIL_PASS));

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export default transporter;