const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "nahidhasan.webdev@gmail.com",
    pass: "zohp vlva buop bgcg",
  },
});

// Wrap in an async IIFE so we can use await.
const sendMail = async (receverEamil, subject, htmlTemplate) => {
  const info = await transporter.sendMail({
    from: '"Node Auth" <maddison53@ethereal.email>',
    to: receverEamil,
    subject: subject,
    html: htmlTemplate, // HTML body
  });

  console.log("Message sent:", info.messageId);
}

module.exports = sendMail