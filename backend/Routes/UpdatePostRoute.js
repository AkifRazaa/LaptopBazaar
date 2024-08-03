const express = require("express");
const Post = require("../Modals/Post");

const router = express.Router();

// POST route to update a post with review and inspection date
router.post("/update-post/:postId", async (req, res) => {
  const { postId } = req.params;
  const { review, inspectionDate } = req.body;

  try {
    // Find the post by ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Update the post with review and inspection date
    post.inspectorReview = review;
    post.inspectionTime = inspectionDate;

    // Save the updated post
    await post.save();

    res
      .status(200)
      .json({ success: true, message: "Post updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
