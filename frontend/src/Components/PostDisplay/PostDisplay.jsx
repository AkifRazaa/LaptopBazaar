import React, { useEffect, useState } from "react";
import "./PostDisplay.css";
import { useNavigate } from "react-router-dom";
import DescriptionBox from "../DescriptionBox/DescriptionBox";
import axios from "axios";

const PostDisplay = (props) => {
  let navigate = useNavigate();
  const { posts } = props;

  const [postId, setPostId] = useState("");
  const [inspectorBuyerReview, setInspectorBuyerReview] = useState("");
  const [inspectionBuyerTime, setInspectionBuyerTime] = useState("");

  const sendMessage = (recipientId, recipientName) => {
    const senderId = localStorage.getItem("userID"); // Get sender's user ID from localStorage
    navigate(`/chat/${recipientId}/${senderId}/${recipientName}`);
  };

  const handlePostId = async () => {
    posts.map((post, index) => setPostId(post._id));
    console.log("Post ID: ", postId);
  };

  const fetchInspectionStatuses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/inspection-requests/post/${postId}`
      );

      setInspectorBuyerReview(response.data.inspectorBuyerReview);
      setInspectionBuyerTime(response.data.inspectionBuyerTime);

      console.log(
        "Inspector Buyer Review: ",
        response.data.inspectorBuyerReview
      );
      console.log(
        "Inspector Buyer Review Time: ",
        response.data.inspectionBuyerTime
      );
    } catch (error) {
      console.error("Error fetching inspection status:", error);
    }
  };

  useEffect(() => {
    handlePostId();
    fetchInspectionStatuses();
  });

  const bookInspection = async (postId) => {
    const userId = localStorage.getItem("userID"); // Get user ID from localStorage

    try {
      console.log({
        postId,
        userId,
      });

      const response = await axios.post(
        "http://localhost:5000/api/book-inspection",
        {
          postId,
          userId,
        }
      );

      if (response.data.success) {
        alert("Inspection request sent successfully");
      } else {
        alert("Failed to send inspection request");
      }
    } catch (error) {
      console.error("Error booking inspection:", error);
      alert("Error booking inspection");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row m-5">
        <div className="col-md-8 ">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            style={{
              maxWidth: "100%",
              maxHeight: "500px",
              overflow: "hidden",
              backgroundColor: "black",
            }}
          >
            <div className="carousel-inner">
              {console.log(posts)}

              {posts.map((image, index) => (
                <React.Fragment key={index}>
                  {image.photos.map((photoUrl, photoIndex) => (
                    <div
                      key={index * 1000 + photoIndex}
                      className={`carousel-item ${
                        index === 0 && photoIndex === 0 ? "active" : ""
                      }`}
                    >
                      <img
                        src={photoUrl}
                        className="d-block w-100"
                        alt={`Laptop ${photoIndex + 1}`}
                        style={{
                          maxHeight: "500px",
                          width: "auto",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        {/* Content for the right side */}
        <div className="col-md-4">
          {posts.map((post, index) => (
            <div key={index} className="row ms-3">
              <h1 className="productDisplayHeading"> {post.adTitle} </h1>

              <div className="col-md-6 mt-4">
                <p>
                  <strong> Condition: </strong> {post.condition}
                </p>
                <p>
                  <strong> Brand: </strong> {post.brand}
                </p>
                <p>
                  <strong> Model: </strong> {post.model}
                </p>
                {post.showPhoneNumber && (
                  <p>
                    <strong> Phone Number: </strong> {post.user.phoneNumber}
                  </p>
                )}
                <p>
                  <strong> Region: </strong> {post.region}
                </p>
                <p>
                  <strong> City: </strong> {post.city}
                </p>
                <p>
                  <strong> Price: </strong> {post.price}
                </p>
                <p>
                  <strong> Seller Name: </strong> {post.user.name}
                </p>

                <button
                  className="btn btn-secondary"
                  onClick={() => sendMessage(post.user._id, post.user.name)}
                >
                  Send Message
                </button>
              </div>

              <div className="col-md-6 mt-4">
                {/* Leave this column empty on large screens */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Second row for inspector reviews */}
      <div className="row m-5">
        {posts.map((post, index) => (
          <div key={index}>
            <div className="col-md-6 mt-3">
              {post.wantsInspection && post.inspectorReview !== "None" && (
                <div>
                  <h1 className="productDisplayHeading">Inspector Review</h1>
                  <p>{post.inspectorReview}</p>

                  <h5>
                    Inspection Time:
                    {post.inspectionTime &&
                      new Date(post.inspectionTime).toLocaleDateString()}
                  </h5>
                </div>
              )}

              {post.wantsInspection && post.inspectorReview === "None" && (
                <div>
                  <h1 className="productDisplayHeading">Inspector Review</h1>
                  <p>Inspector review is pending</p>
                </div>
              )}

              {!post.wantsInspection && inspectorBuyerReview === "None" && (
                <div>
                  <h1 className="productDisplayHeading">Book an inspection</h1>
                  <button
                    className="btn btn-secondary"
                    onClick={() => bookInspection(post._id)}
                  >
                    Book Inspection
                  </button>
                </div>
              )}

              {!post.wantsInspection && inspectorBuyerReview !== "None" && (
                <div>
                  <h1 className="productDisplayHeading">Inspector Review</h1>
                  <p>{inspectorBuyerReview}</p>

                  <p>
                    Inspection Time:{" "}
                    {new Date(inspectionBuyerTime).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            <DescriptionBox description={post.description} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDisplay;

// import React, { useEffect, useState } from "react";
// import "./PostDisplay.css";
// import { useNavigate } from "react-router-dom";
// import DescriptionBox from "../DescriptionBox/DescriptionBox";
// import axios from "axios";

// const PostDisplay = (props) => {
//   let navigate = useNavigate();
//   const { posts } = props;
//   const [inspectionStatuses, setInspectionStatuses] = useState({});

//   useEffect(() => {
//     const fetchInspectionStatuses = async () => {
//       const statuses = {};
//       for (const post of posts) {
//         try {
//           const response = await axios.get(
//             `http://localhost:5000/api/inspection-requests/post/${post._id}`
//           );
//           statuses[post._id] = response.data.inspectionRequest || {};
//         } catch (error) {
//           console.error("Error fetching inspection status:", error);
//         }
//       }
//       console.log("Fetched inspection statuses:", statuses); // Add this line
//       setInspectionStatuses(statuses);
//     };

//     fetchInspectionStatuses();
//   }, [posts]);

//   const sendMessage = (recipientId, recipientName) => {
//     const senderId = localStorage.getItem("userID"); // Get sender's user ID from localStorage

//     navigate(`/chat/${recipientId}/${senderId}/${recipientName}`);
//   };

//   const bookInspection = async (postId) => {
//     const userId = localStorage.getItem("userID"); // Get user ID from localStorage

//     try {
//       console.log({
//         postId,
//         userId,
//       });

//       const response = await axios.post(
//         "http://localhost:5000/api/book-inspection",
//         {
//           postId,
//           userId,
//         }
//       );

//       if (response.data.success) {
//         alert("Inspection request sent successfully");
//         // Fetch the updated inspection status
//         const updatedStatus = await axios.get(
//           `http://localhost:5000/api/inspection-requests/post/${postId}`
//         );
//         setInspectionStatuses((prev) => ({
//           ...prev,
//           [postId]: updatedStatus.data.inspectionRequest,
//         }));
//       } else {
//         alert("Failed to send inspection request");
//       }
//     } catch (error) {
//       console.error("Error booking inspection:", error);
//       alert("Error booking inspection");
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row m-5">
//         <div className="col-md-8 ">
//           <div
//             id="carouselExampleIndicators"
//             className="carousel slide"
//             style={{
//               maxWidth: "100%",
//               maxHeight: "500px",
//               overflow: "hidden",
//               backgroundColor: "black",
//             }}
//           >
//             <div className="carousel-inner">
//               {console.log(posts)}

//               {posts.map((image, index) => (
//                 <React.Fragment key={index}>
//                   {image.photos.map((photoUrl, photoIndex) => (
//                     <div
//                       key={index * 1000 + photoIndex}
//                       className={`carousel-item ${
//                         index === 0 && photoIndex === 0 ? "active" : ""
//                       }`}
//                     >
//                       <img
//                         src={photoUrl}
//                         className="d-block w-100"
//                         alt={`Laptop ${photoIndex + 1}`}
//                         style={{
//                           maxHeight: "500px",
//                           width: "auto",
//                           objectFit: "contain",
//                         }}
//                       />
//                     </div>
//                   ))}
//                 </React.Fragment>
//               ))}
//             </div>
//             <button
//               className="carousel-control-prev"
//               type="button"
//               data-bs-target="#carouselExampleIndicators"
//               data-bs-slide="prev"
//             >
//               <span
//                 className="carousel-control-prev-icon"
//                 aria-hidden="true"
//               ></span>
//               <span className="visually-hidden">Previous</span>
//             </button>
//             <button
//               className="carousel-control-next"
//               type="button"
//               data-bs-target="#carouselExampleIndicators"
//               data-bs-slide="next"
//             >
//               <span
//                 className="carousel-control-next-icon"
//                 aria-hidden="true"
//               ></span>
//               <span className="visually-hidden">Next</span>
//             </button>
//           </div>
//         </div>

//         {/* Content for the right side */}
//         <div className="col-md-4">
//           {posts.map((post, index) => (
//             <div key={index} className="row ms-3">
//               <h1 className="productDisplayHeading"> {post.adTitle} </h1>

//               <div className="col-md-6 mt-4">
//                 <p>
//                   <strong> Condition: </strong> {post.condition}
//                 </p>
//                 <p>
//                   <strong> Brand: </strong> {post.brand}
//                 </p>
//                 <p>
//                   <strong> Model: </strong> {post.model}
//                 </p>
//                 {post.showPhoneNumber && (
//                   <p>
//                     <strong> Phone Number: </strong> {post.user.phoneNumber}
//                   </p>
//                 )}
//                 <p>
//                   <strong> Region: </strong> {post.region}
//                 </p>
//                 <p>
//                   <strong> City: </strong> {post.city}
//                 </p>
//                 <p>
//                   <strong> Price: </strong> {post.price}
//                 </p>
//                 <p>
//                   <strong> Seller Name: </strong> {post.user.name}
//                 </p>

//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => sendMessage(post.user._id, post.user.name)}
//                 >
//                   Send Message
//                 </button>
//               </div>

//               <div className="col-md-6 mt-4">
//                 {/* Leave this column empty on large screens */}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Second row for inspector reviews */}
//       <div className="row m-5">
//         {posts.map((post, index) => (
//           <div key={index}>
//             <div className="col-md-6 mt-3">
//               {post.wantsInspection && inspectionStatuses[post._id]?.inspectorReview !== "None" && (
//                 <div>
//                   <h1 className="productDisplayHeading">Inspector Review</h1>
//                   <p>{inspectionStatuses[post._id].inspectorReview}</p>

//                   <h5>
//                     Inspection Time:
//                     {inspectionStatuses[post._id]?.inspectionTime &&
//                       new Date(inspectionStatuses[post._id].inspectionTime).toLocaleDateString()}
//                   </h5>
//                 </div>
//               )}

//               {post.wantsInspection && inspectionStatuses[post._id]?.inspectorReview === "None" && (
//                 <div>
//                   <h1 className="productDisplayHeading">Inspector Review</h1>
//                   <p>Inspector review is pending</p>
//                 </div>
//               )}

//               {!post.wantsInspection && !inspectionStatuses[post._id] && (
//                 <div>
//                   <h1 className="productDisplayHeading">Book an inspection</h1>
//                   <button
//                     className="btn btn-secondary"
//                     onClick={() => bookInspection(post._id)}
//                   >
//                     Book Inspection
//                   </button>
//                 </div>
//               )}
//             </div>

//             <DescriptionBox description={post.description} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PostDisplay;
