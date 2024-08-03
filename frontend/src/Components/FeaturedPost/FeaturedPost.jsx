import React, { useState, useEffect } from "react";
import "./FeaturedPost.css";
import Item from "../Item/Item";
import axios from "axios";

const FeaturedPost = () => {
  const [recentPost, setRecentPost] = useState([]);

  useEffect(() => {
    // Fetch all posts from the backend
    axios
      .get("http://localhost:5000/api/all-post")
      .then((response) => {
        // Filter posts where inspectorReview is other than "None"
        const filteredPosts = response.data.filter(
          (post) => post.inspectorReview !== "None"
        );
        // Set the filtered posts to the state
        setRecentPost(filteredPosts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="new-collections">
      <h1>Featured Posts</h1>
      <hr />
      <div className="collections">
        {recentPost.map((post) => (
          <Item key={post._id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedPost;
