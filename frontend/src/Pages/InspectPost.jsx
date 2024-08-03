import React, { useEffect, useState } from "react";
import axios from "axios";
import { inspectorLinks } from "../Assets/sidebar_links";
import Sidebar from "../Admin/Sidebar/Sidebar";

const InspectPost = () => {
  const [posts, setPosts] = useState([]);
  const [review, setReview] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/all-post");

      const filteredPosts = response.data.filter(
        (post) =>
          post.assignedInspector &&
          post.assignedInspector._id === localStorage.getItem("userID") &&
          post.inspectorReview === "None"
      );

      setPosts(filteredPosts);
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSendReview = async (postId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/update-post/${postId}`,
        {
          review,
          inspectionDate,
        }
      );
      console.log("Review and inspection date sent successfully!");

      if (response.status === 200) {
        // Refresh data after update
        alert("Post updated");
        fetchData();
      }
    } catch (error) {
      console.error("Error sending review and inspection date:", error);
    }
  };

  return (
    <div>
      <Sidebar links={inspectorLinks} isAdmin={false} />

      <div className="w3-main" style={{ marginLeft: "200px" }}>
        <div className="w3-container table-responsive">
          <h1 className="text-center mb-5">Approve Posts</h1>

          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User</th>
                <th scope="col">Ad Title</th>
                <th scope="col">Description</th>
                <th scope="col">Condition</th>
                <th scope="col">Brand</th>
                <th scope="col">Model</th>
                <th scope="col">Operating System</th>
                <th scope="col">Price</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Photos</th>
                <th scope="col">Inspection Date</th>
                <th scope="col">Review</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{post.user.name}</td>
                  <td>{post.adTitle}</td>
                  <td>{post.description}</td>
                  <td>{post.condition}</td>
                  <td>{post.brand}</td>
                  <td>{post.model}</td>
                  <td>{post.operatingSystem}</td>
                  <td>{post.price}</td>
                  <td>{post.user.phoneNumber}</td>

                  <td>
                    {post.photos.map((photoUrl, photoIndex) => (
                      <img
                        key={photoIndex}
                        src={photoUrl}
                        alt={` ${photoIndex}`}
                        style={{
                          width: "100px",
                          height: "auto",
                          marginRight: "5px",
                          marginBottom: "5px",
                        }}
                      />
                    ))}
                  </td>

                  <td>
                    <input
                      type="date"
                      value={inspectionDate}
                      onChange={(e) => setInspectionDate(e.target.value)}
                    />
                  </td>

                  <td>
                    <textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      rows="3"
                      cols="20"
                    ></textarea>
                  </td>

                  <td>
                    <button onClick={() => handleSendReview(post._id)}>
                      Send
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InspectPost;
