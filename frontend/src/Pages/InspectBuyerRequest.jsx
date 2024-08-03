import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Admin/Sidebar/Sidebar";
import { inspectorLinks } from "../Assets/sidebar_links";
import { toast } from "react-toastify";

const InspectorRequests = () => {
  const [inspectionRequests, setInspectionRequests] = useState([]);
  const [formData, setFormData] = useState({});
  const inspectorId = localStorage.getItem("userID");

  const fetchInspectionRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/inspector-requests/${inspectorId}`
      );
      setInspectionRequests(response.data.requests);
    } catch (error) {
      console.error("Error fetching inspection requests:", error);
    }
  };

  useEffect(() => {
    fetchInspectionRequests();

    console.log(localStorage.getItem("userID"));
  }, [inspectorId]);

  const handleInputChange = (requestId, field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [requestId]: {
        ...prevFormData[requestId],
        [field]: value,
      },
    }));
  };

  const handleSave = async (requestId) => {
    const { inspectionTime, inspectorReview } = formData[requestId];
    try {
      const response = await axios.put(
        `http://localhost:5000/api/inspector-requests/${requestId}`,
        { inspectionTime, inspectorReview }
      );
      if (response.data.success) {
        toast.success("Review Added Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      fetchInspectionRequests();
    } catch (error) {
      console.error("Error saving inspection request:", error);
    }
  };

  return (
    <>
      <Sidebar links={inspectorLinks} isAdmin={false} />

      <div className="w3-main" style={{ marginLeft: "220px" }}>
        <div className="w3-container table-responsive">
          <h1 className="text-center mb-5">My Inspection Requests</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Ad Title</th>
                <th scope="col">Description</th>
                <th scope="col">Photos</th>
                <th scope="col">Brand</th>
                <th scope="col">Model</th>
                <th scope="col">User Name</th>
                <th scope="col">Inspection Time</th>
                <th scope="col">Inspector Review</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inspectionRequests.map((request) => (
                <tr key={request._id}>
                  <td>{request.postId.adTitle}</td>
                  <td>{request.postId.description}</td>
                  <td>
                    {request.postId.photos.map((photo, index) => (
                      <img key={index} src={photo} alt="Photo" width="50" />
                    ))}
                  </td>
                  <td>{request.postId.brand}</td>
                  <td>{request.postId.model}</td>
                  <td>{request.userId.name}</td>
                  <td>
                    <input
                      type="datetime-local"
                      value={formData[request._id]?.inspectionTime || ""}
                      onChange={(e) =>
                        handleInputChange(
                          request._id,
                          "inspectionTime",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={formData[request._id]?.inspectorReview || ""}
                      onChange={(e) =>
                        handleInputChange(
                          request._id,
                          "inspectorReview",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleSave(request._id)}
                    >
                      Save
                    </button>
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

export default InspectorRequests;
