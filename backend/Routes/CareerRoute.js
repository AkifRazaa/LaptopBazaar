const express = require("express");
const router = express.Router();
const Career = require("../Modals/Career");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dykz4w5ah",
  api_key: "348421475998792",
  api_secret: "Bf54YFkt9BERamTl7w-9vDYzZcc",
});

// Route to handle form submission
router.post("/career", async (req, res) => {
  try {
    const { userId, name, email, address, region, city, phoneNumber, cnic } =
      req.body;

    const cv = req.body.cv;

    // Upload PDF file to Cloudinary
    const result = await cloudinary.uploader.upload(cv, {
      folder: "/e-com",
      format: "png",
    });

    console.log(result.secure_url);

    console.log({
      userId,
      name,
      email,
      address,
      region,
      city,
      phoneNumber,
      cnic,
    });

    // Create a new Career document with Cloudinary URL
    const career = new Career({
      userId,
      name,
      email,
      address,
      region,
      city,
      phoneNumber,
      cnic,
      CV: result.secure_url, // Save Cloudinary URL in the database
    });

    console.log(career);

    // Save the Career document to the database
    await career.save();

    res.status(201).json({
      success: true,
      message: "Career form submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting career form:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
