import React, { useState, useEffect } from "react";
import "../Components/RecentPost/RecentPost.css";
import axios from "axios";
import Item from "../Components/Item/Item";
import { useLocation } from "react-router-dom";
import Filter from "../Components/Filter/Filter";

const ShopCategory = () => {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Get the filter options from the URL
  const userQuery = queryParams.get("query");
  const brand = queryParams.get("brand");
  const city = queryParams.get("city");

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/filter-posts", {
        brand,
        city,
        userQuery,
      })
      .then((response) => {
        setFilteredPosts(response.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching filtered posts:", error);
        setLoading(false); // Set loading to false if there's an error
      });
  }, [brand, city, userQuery]); // Include brand, city, and userQuery in dependency array

  return (
    <>
    <Filter />
    <div className="new-collections">
      <h1>Filtered Posts</h1>
      <hr />
      {loading ? (
        <p> <strong>Loading...</strong> </p>
      ) : filteredPosts.length === 0 ? (
        <p> <strong>No posts found</strong> </p>
      ) : (
        <div className="collections">
          {filteredPosts.map((post) => (
            <Item key={post._id} {...post} />
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default ShopCategory;
