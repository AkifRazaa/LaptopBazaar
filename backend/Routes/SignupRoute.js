// const express = require("express");
// const User = require("../Modals/User");
// const nodemailer = require("nodemailer");
// const bcrypt = require("bcrypt");
// require('dotenv').config();

// const router = express.Router();

// // Function to generate random string
// const randString = () => {
//   const len = 8; 
//   let randStr = "";
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (let i = 0; i < len; i++) {
//     const ch = Math.floor(Math.random() * characters.length);
//     randStr += characters[ch];
//   }
//   return randStr;
// };

// // Function to send email
// const sendEmail = async (email, uniqueString) => {

//   const Transport = nodemailer.createTransport({
//     service: "Gmail",
//     host: "smtp.gmail.com",
//     auth: {
//       user: process.env.NODEMAILER_EMAIL,
//       pass: process.env.NODEMAILER_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: process.env.NODEMAILER_EMAIL,
//     to: email,
//     subject: "Email confirmation",
//     html: `Press <a href=http://localhost:3000/verify/${uniqueString}> Here </a> to verify your email. Thanks`,
//   };

//   try {
//     await Transport.sendMail(mailOptions);
//     console.log("Email sent");
//   } catch (error) {
//     console.log("Error sending email: ", error);
//   }
// };

// router.post("/signup", async (req, res) => {
//   try {
//     const { name, email, phoneNumber, password } = req.body;
//     const uniqueString = randString();
//     const isValid = false;

//     // Check if user already exists
//     let user = await User.findOne({ email });

//     if (user) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user document
//     user = new User({
//       name,
//       email,
//       phoneNumber,
//       password: hashedPassword,
//       isValid,
//       uniqueString,
//     });

//     // Save the user to the database
//     await user.save();
//     console.log("User Added Successfully");

//     // Send the email
//     await sendEmail(email, uniqueString);

//     res.status(200).json({ success: true, message: "Signup successful" }); // Send a response with status code 200 and a message
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// });

// module.exports = router;


require('dotenv').config();
const express = require("express");
const User = require("../Modals/User");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const router = express.Router();

// Function to generate random string
const randString = () => {
  const len = 8; 
  let randStr = "";
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < len; i++) {
    const ch = Math.floor(Math.random() * characters.length);
    randStr += characters[ch];
  }
  return randStr;
};

// Function to send email
const sendEmail = async (email, uniqueString) => {

  const Transport = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Email confirmation",
    html: `Press <a href=http://localhost:3000/verify/${uniqueString}> Here </a> to verify your email. Thanks`,
  };

  try {
    await Transport.sendMail(mailOptions);
    console.log("Email sent");
  } catch (error) {
    console.log("Error sending email: ", error);
  }
};

router.post("/signup", async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    const uniqueString = randString();
    const isValid = false;

    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    user = new User({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      isValid,
      uniqueString,
    });

    // Save the user to the database
    await user.save();
    console.log("User Added Successfully");

    // Send the email
    await sendEmail(email, uniqueString);

    res.status(200).json({ success: true, message: "Signup successful" }); // Send a response with status code 200 and a message
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Route to handle email verification
router.get("/verify/:uniqueString", async (req, res) => {
  try {
    const { uniqueString } = req.params;

    // Find the user with the unique string
    const user = await User.findOne({ uniqueString });

    if (!user) {
      return res.status(400).json({ message: "Invalid verification link" });
    }

    // Update the isValid field to true
    user.isValid = true;
    user.uniqueString = ""; // Clear the unique string after verification

    await user.save();

    // Redirect to a success page or send a success message
    res.status(200).json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
