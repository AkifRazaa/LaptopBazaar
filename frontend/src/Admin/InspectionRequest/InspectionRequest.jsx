import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import { adminLinks } from "../../Assets/sidebar_links";

const InspectionRequests = () => {
  const [inspectionRequests, setInspectionRequests] = useState([]);
  const [inspectors, setInspectors] = useState([]);
  const [selectedInspectors, setSelectedInspectors] = useState({});

  const fetchInspectionRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/inspection-requests"
      );
      setInspectionRequests(response.data.requests);
      setInspectors(response.data.inspectors);
    } catch (error) {
      console.error("Error fetching inspection requests:", error);
    }
  };

  useEffect(() => {
    fetchInspectionRequests();
  }, []);

  const handleInspectorChange = (requestId, inspectorId) => {
    setSelectedInspectors((prevSelectedInspectors) => ({
      ...prevSelectedInspectors,
      [requestId]: inspectorId,
    }));
  };

  const handleApprove = async (requestId) => {
    const inspectorId = selectedInspectors[requestId];
    try {
      await axios.post(
        `http://localhost:5000/api/inspection-requests/${requestId}/approve`,
        { inspectorId }
      );
      fetchInspectionRequests();
    } catch (error) {
      console.error("Error approving inspection request:", error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/inspection-requests/${requestId}`
      );
      fetchInspectionRequests();
    } catch (error) {
      console.error("Error rejecting inspection request:", error);
    }
  };

  return (
    <>
      <Sidebar links={adminLinks} isAdmin={true} />

      <div className="w3-main" style={{ marginLeft: "220px" }}>
        <div className="w3-container table-responsive">
          <h1 className="text-center mb-5">Inspection Requests</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Ad Title</th>
                <th scope="col">Description</th>
                <th scope="col">Photos</th>
                <th scope="col">Brand</th>
                <th scope="col">Model</th>
                <th scope="col">User Name</th>
                <th scope="col">Status</th>
                <th scope="col">Assign Inspector</th>
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
                      <img
                        key={index}
                        src={photo}
                        alt="Photo"
                        style={{
                          width: "130px",
                          height: "auto",
                          marginRight: "5px",
                          marginBottom: "5px",
                          marginTop: "5px",
                        }}
                      />
                    ))}
                  </td>
                  <td>{request.postId.brand}</td>
                  <td>{request.postId.model}</td>
                  <td>{request.userId.name}</td>
                  <td>{request.status}</td>
                  <td>
                    <select
                      onChange={(e) =>
                        handleInspectorChange(request._id, e.target.value)
                      }
                    >
                      <option value="">Select Inspector</option>
                      {inspectors.map((inspector) => (
                        <option key={inspector._id} value={inspector._id}>
                          {inspector.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary mr-3"
                      onClick={() => handleApprove(request._id)}
                      disabled={!selectedInspectors[request._id]}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleReject(request._id)}
                    >
                      Reject
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

export default InspectionRequests;
