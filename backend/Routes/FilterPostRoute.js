// Import necessary modules
const express = require("express");
const router = express.Router();
const Post = require("../Modals/Post"); // Assuming your Post model is defined in a separate file

// Define a route for filtering posts
router.post("/filter-posts", async (req, res) => {
  try {
    // Extract filter criteria from the request body
    const { brand, city, query } = req.body;

    // Construct the filter object based on provided criteria
    const filter = {};

    // Apply brand filter if specified
    if (brand && brand !== "All Brands") {
      filter.brand = brand;
    }

    // Apply city filter if specified
    if (city && city !== "All Cities") {
      filter.city = city;
    }

    // Apply query filter if specified
    if (query) {
      // Use regular expression to perform case-insensitive search
      filter.adTitle = { $regex: query, $options: "i" };
    }

    // Find posts that meet the filter criteria
    const filteredPosts = await Post.find(filter);

    // Return the filtered posts as response
    return res.json(filteredPosts);

    // if (filteredPosts.length === 0) {
    //   // Return the filtered posts as response
    //   return res.json({ message: "No Post" });
    // } else {
    //   // Return the filtered posts as response
    //   return res.json(filteredPosts);
    // }
  } catch (error) {
    console.error("Error filtering posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Export the router
module.exports = router;
