const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require("../Modals/User");
const bcrypt = require("bcrypt");


router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  console.log("Email received for password reset:", email);

  try {
    // Using a case insensitive search
    const user = await User.findOne({ email });

    console.log("User found:", user);

    if (!user) {
      return res.json({ success: false, message: "Email does not exist" });
    }


    // Generate a token and set it in the user's document
    const token = crypto.randomBytes(20).toString("hex");
    user.uniqueString = token;
    // user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      to: user.email,
      from: "passwordreset@demo.com",
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      http://localhost:3000/reset-password/${token}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(500).send("Error sending email");
      }
      res.status(200).json({
        success: true,
        message: "Password reset link sent to your email",
      });

      console.log("Password reset link sent to your email")
    });
  } catch (error) {
    console.error("Error in /forgot-password route:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      uniqueString: token,
    });

    if (!user) {
      return res.status(400).send("Invalid or expired token");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword; // Hash the password before saving
    user.uniqueString = undefined;

    await user.save();

    res.status(200).send("Password reset successful");
  } catch (error) {
    console.error("Error in /reset-password route:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
