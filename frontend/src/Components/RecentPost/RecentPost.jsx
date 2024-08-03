import React, { useState, useEffect } from "react";
import "./RecentPost.css";
import Item from "../Item/Item";
import axios from "axios";

const RecentPost = () => {
  const [recentPost, setRecentPost] = useState([]);

  useEffect(() => {
    // Fetch all posts from the backend
    axios
      .get("http://localhost:5000/api/all-post")
      .then((response) => {
        // Get the last 6 posts
        const lastSixPosts = response.data.slice(-6);
        setRecentPost(lastSixPosts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="new-collections">
      <h1>Recent Posts</h1>
      <hr />
      <div className="collections">
        {recentPost.map((post) => (
          <Item key={post._id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default RecentPost;
