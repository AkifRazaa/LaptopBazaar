const express = require("express");
const bcrypt = require("bcrypt");
const Inspector = require("../Modals/Inspector");

const router = express.Router();

router.post("/add-inspector", async (req, res) => {
  try {
    // Check if user already exists
    let inspector = await Inspector.findOne({ email: req.body.email });

    if (inspector) {
      return res.status(400).json({ message: "Inspector already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    inspector = new Inspector({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      region: req.body.region,
      city: req.body.city,
      phoneNumber: req.body.phoneNumber,
    });

    // Save the user to the database
    inspector
      .save()
      .then(() => {
        console.log("Inspector Added Successfully");
        res
          .status(200)
          .json({ sucess: true, message: "Add inspector successful" }); // Send a response with status code 200 and a message
      })
      .catch((error) => {
        console.log("Failed to add inspector:::::", error);
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ sucess: false, message: "Server Error" });
  }
});

module.exports = router;
