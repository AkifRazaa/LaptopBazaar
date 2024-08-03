const express = require("express");
const Post = require("../Modals/Post");

const router = express.Router();

router.post("/user-posts", async (req, res) => {
  const { userId } = req.body;

  console.log("Received userId:", userId);

  try {
    // Fetch user posts based on userId and adminApproved=true
    const userPosts = await Post.find({ user: userId, adminApproved: true });

    res.status(200).json(userPosts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
