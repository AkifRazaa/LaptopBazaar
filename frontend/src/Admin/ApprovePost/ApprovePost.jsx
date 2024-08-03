import React, { useState, useEffect } from "react";
import "./ApprovePost.css";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import { adminLinks } from "../../Assets/sidebar_links";

const ApprovePost = () => {
  const [posts, setPosts] = useState([]);
  const [approvalData, setApprovalData] = useState({});
  const [inspectorData, setInspectorData] = useState({});

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/approve-post"
      );
      // Filter posts based on adminApproved and adminDisplay criteria
      const filteredPosts = response.data.filter(
        (post) => !post.adminApproved && post.adminDisplay
      );
      setPosts(filteredPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Event handler for updating approval data
  const handleApprovalChange = (postId, value) => {
    setApprovalData({
      ...approvalData,
      [postId]: value,
    });
  };

  // Event handler for updating inspector data
  const handleInspectorChange = (postId, value) => {
    setInspectorData({
      ...inspectorData,
      [postId]: value,
    });
  };

  const handleAssignInspector = async (postId) => {
    const approval = approvalData[postId] || "";
    const inspector = inspectorData[postId] || "";

    try {
      // Send approval and inspector data to the backend
      await axios.post(`http://localhost:5000/api/approve-post/${postId}`, {
        approve: approval,
        inspector: inspector,
        adminDisplay: false,
      });
    } catch (error) {
      console.error("Error assigning inspector:", error);
    }

    await fetchPosts();
    // console.log("Post ID:", postId);
    // console.log("Approval:", approval);
    // console.log("Inspector:", inspector);
  };

  return (
    <>
      <Sidebar links={adminLinks} isAdmin={true} />

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
                <th scope="col">Region</th>
                <th scope="col">City</th>
                <th scope="col">Show Phone Number</th>
                <th scope="col">Wants Inspection</th>
                <th scope="col">Photos</th>
                <th scope="col">Approve</th>

                {posts.some((post) => post.wantsInspection) && (
                  <>
                    <th scope="col">Assign Inspector</th>
                    <th scope="col">Action</th>
                  </>
                )}
              </tr>
            </thead>

            <tbody>
              {posts.length>0 ? (
              posts.map((post, index) => (
                <tr key={post._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{post.user.name ? post.user.name : "na"}</td>
                  <td>{post.adTitle}</td>
                  <td>{post.description}</td>
                  <td>{post.condition}</td>
                  <td>{post.brand}</td>
                  <td>{post.model}</td>
                  <td>{post.operatingSystem}</td>
                  <td>{post.price}</td>
                  <td>{post.region}</td>
                  <td>{post.city}</td>
                  <td>{post.showPhoneNumber.toString()}</td>
                  <td>{post.wantsInspection.toString()}</td>

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

                  {/* Approve column */}
                  <td className="text-center">
                    <input
                      type="radio"
                      name={`approve-${post._id}`}
                      value="yes"
                      onChange={() => handleApprovalChange(post._id, "yes")}
                      id={`option15-${post._id}`}
                      autoComplete="off"
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`option15-${post._id}`}
                    >
                      Yes
                    </label>
                    <br />

                    <input
                      type="radio"
                      name={`approve-${post._id}`}
                      value="no"
                      onChange={() => handleApprovalChange(post._id, "no")}
                      id={`option16-${post._id}`}
                      autoComplete="off"
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`option16-${post._id}`}
                    >
                      No
                    </label>
                  </td>

                  {/* Conditionally rendering inspection  */}
                  {post.wantsInspection && (
                    <>
                      <td>
                        <select
                          onChange={(e) =>
                            handleInspectorChange(post._id, e.target.value)
                          }
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select Inspector
                          </option>
                          {post.inspectors.map((inspectorInfo) => (
                            <option
                              key={inspectorInfo._id}
                              value={inspectorInfo._id}
                            >
                              {inspectorInfo.name}
                            </option>
                          ))}
                        </select>
                      </td>
                    </>
                  )}

                  {/* Send Button column */}
                  <td>
                    <button onClick={() => handleAssignInspector(post._id)}>
                      Send
                    </button>
                  </td>
                </tr>
              ))
            ) : (<p>No Post</p>) }
            
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ApprovePost;
