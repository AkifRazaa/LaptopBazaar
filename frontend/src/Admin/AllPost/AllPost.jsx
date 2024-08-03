import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import { MdOutlineCancel } from "react-icons/md";
import { adminLinks } from "../../Assets/sidebar_links";

const AllPost = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/all-post");
      // Filter the posts where adminApproved is true
      const approvedPosts = response.data.filter(
        (post) => post.adminApproved === true
      );
      setPosts(approvedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete-post/${postId}`);
      // After successfully deleting the post, refetch the posts to update the UI
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      <Sidebar links={adminLinks} isAdmin={true} />

      <div className="w3-main" style={{ marginLeft: "200px" }}>
        <div className="w3-container table-responsive">
          <h1 className="text-center mb-5">All Posts</h1>

          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">User</th>
                <th scope="col">Brand</th>
                <th scope="col">Price</th>
                <th scope="col">City</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Wants Inspection</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>

            <tbody>
              {posts.map((post, index) => (
                <tr key={post._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{post.adTitle}</td>
                  <td>{post.user.name}</td>
                  <td>{post.brand}</td>
                  <td>{post.price}</td>
                  <td>{post.city}</td>
                  <td>{post.user.phoneNumber.toString()}</td>
                  <td>{post.wantsInspection.toString()}</td>

                  {/* <td>
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
                  </td> */}

                  {/* <td>
                    {post.assignedInspector
                      ? post.assignedInspector.name
                      : "Not Opted"}
                  </td>

                  <td>
                    {post.inspectorReview ? post.inspectorReview : "None"}
                  </td>

                  <td>
                    {post.inspectionTime
                      ? post.inspectionTime
                      : "Not yet inspected"}
                  </td> */}

                  <td
                    className="text-center fs-2"
                    onClick={() => handleDeletePost(post._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <MdOutlineCancel />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllPost;
