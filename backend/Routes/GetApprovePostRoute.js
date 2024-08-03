const express = require("express");
const Post = require("../Modals/Post");
const User = require("../Modals/User");
const Inspector = require("../Modals/Inspector");

const router = express.Router();

router.get("/approve-post", async (req, res) => {
  try {
    const posts = await Post.find({
      adminApproved: false,
      adminDisplay: true,
    });

    const postUserIds = posts.map((post) => post.user);
    const users = await User.find({ _id: { $in: postUserIds } });

    // Fetch all inspectors
    const inspectors = await Inspector.find({});

    // Merge user details into each post
    const postsWithUserDetails = posts.map((post) => {
      const user = users.find(
        (user) => user._id.toString() === post.user.toString()
      );
      return { ...post.toObject(), user };
    });

    // Merge inspector details into each post if wantsInspection is true
    const postsWithInspectorDetails = await Promise.all(
      postsWithUserDetails.map(async (post) => {
        if (post.wantsInspection) {
          const cityInspectors = inspectors.filter(
            (inspector) => inspector.city === post.city
          );
          const inspectorPromises = cityInspectors.map(async (inspector) => {
            // You may want to fetch inspector details from another collection here
            return { ...inspector.toObject() };
          });
          const inspectorsForPost = await Promise.all(inspectorPromises);
          return { ...post, inspectors: inspectorsForPost };
        }
        return post;
      })
    );

    res.status(200).json(postsWithInspectorDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
