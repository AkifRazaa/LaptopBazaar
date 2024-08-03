const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Modals/User");
const Inspector = require("../Modals/Inspector");

const router = express.Router();

const jwtSecret = "Hello";

router.post("/:userRole/login", async (req, res) => {
  // Use dynamic route parameter
  const { userRole } = req.params; // Extract userRole from request parameters
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  let UserCollection; // Variable to store the collection based on userRole

  // Determine the collection based on userRole
  switch (userRole) {
    case "user":
      UserCollection = User;
      break;
    case "inspector":
      UserCollection = Inspector;
      break;
    default:
      return res
        .status(400)
        .json({ success: false, message: "Invalid user role" });
  }

  try {
    const userData = await UserCollection.findOne({ email: userEmail }); // Use the determined collection
    if (!userData) {
      console.log("User does not exist");
      return res
        .status(401)
        .json({ success: false, message: "User does not exist" });
    }

    if (userData.isValid === false) {
      return res
        .status(401)
        .json({ success: false, message: "User does not exist" });

    }

    // Comparing the encrypted password and user password
    const comparedPassword = await bcrypt.compare(
      userPassword,
      userData.password
    );

    if (comparedPassword) {
      console.log("Login successful");

      // Generate a JWT token
      const token = jwt.sign({ userId: userData._id }, jwtSecret, {
        expiresIn: "1h", // Token will expire in 1 hour
      });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        token: token,
        user: userData,
      });
    } else {
      console.log("Invalid Credentials");
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

//done