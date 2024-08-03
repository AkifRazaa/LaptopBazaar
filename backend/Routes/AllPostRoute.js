const express = require("express");
const Post = require("../Modals/Post");

const router = express.Router();

router.get("/all-post", async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("user") // Populate the user field
      .populate("assignedInspector"); // Populate the assignedInspector field

    res.status(200).send(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
