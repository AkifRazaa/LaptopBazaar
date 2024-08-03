import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostDisplay from "../Components/PostDisplay/PostDisplay";

const PostDetail = () => {
  const [posts, setPosts] = useState([]);
  const { postId } = useParams(); //This is used to get post id from the url which willwritten in App.js

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/all-post");
      // Filter the posts where adminApproved is true
      const filteredPost = response.data.filter((post) => post._id === postId);
      setPosts(filteredPost);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <PostDisplay posts={posts} />
    </div>
  );
};

export default PostDetail;
