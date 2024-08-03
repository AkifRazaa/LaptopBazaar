import React, { useState, useEffect } from "react";
import "./MyPosts";
import axios from "axios";
import Item from "../Components/Item/Item";
import Ad from "./Ad";

const MyPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const userId = localStorage.getItem("userID");

  const fetchUserPosts = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user-posts",
        { userId }
      );
      setUserPosts(response.data);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  return (
    <div>
      <h1 className="text-center mt-5 mb-4">My Posts</h1>
      <div className="shopCategory-products">
        {userPosts.map((post) => (
          <Item key={post._id} {...post} />
        ))}
      </div>
      
    </div>
  );
};

export default MyPosts;
