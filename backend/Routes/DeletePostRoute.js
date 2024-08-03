const express = require("express");
const Post = require("../Modals/Post");

const router = express.Router();

// DELETE route to delete a post by ID
router.delete("/delete-post/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    // Find the post by ID and delete it
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res
      .status(200)
      .json({ message: "Post deleted successfully", post: deletedPost });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
