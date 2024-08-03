const express = require("express");
const mongoose = require("mongoose");
const Post = require("../Modals/Post");

const router = express.Router();

router.post("/approve-post/:postId", async (req, res) => {
  const { approve, inspector, adminDisplay } = req.body;
  const { postId } = req.params;

//   console.log("Approve:", approve);
//   console.log("Inspector:", inspector);
//   console.log("postID:", postId);
//   console.log("adminDisplay:", adminDisplay);

  try {
    // Find the post by ID
    let post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Update adminApproved field based on the approval status
    post.adminApproved = approve === "yes";
    post.adminDisplay = adminDisplay;

    // Convert inspector string to ObjectId
    if (inspector) {
      post.assignedInspector = inspector;
    }

    // Save the updated post
    const response = await post.save();
    // console.log(response)

    // Send a success response
    res
      .status(200)
      .json({ message: "Post approval status updated successfully", post });
  } catch (error) {
    console.error("Error approving post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
