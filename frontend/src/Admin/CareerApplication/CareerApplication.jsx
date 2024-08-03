import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { adminLinks } from "../../Assets/sidebar_links";
import axios from "axios";
import { RingLoader } from "react-spinners";

const CareerApplication = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Fetch applications data from the backend
        const response = await axios.get(
          "http://localhost:5000/api/applications"
        );
        setApplications(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <>
      <Sidebar links={adminLinks} isAdmin={true} />

      <div className="w3-main" style={{ marginLeft: "200px" }}>
        <div className="w3-container table-responsive">
          <h1 className="text-center mb-5">Career Applications</h1>

          {loading ? (
            <div className="d-flex justify-content-center mb-3">
              <RingLoader color={"#123abc"} loading={loading} size={50} />
            </div>
          ) : (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Address</th>
                  <th scope="col">Region</th>
                  <th scope="col">City</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Application Date</th>
                  <th scope="col">CV</th>
                </tr>
              </thead>

              {console.log(applications)}

              <tbody>
                {applications.map((application, index) => (
                  <tr key={application._id}>
                    <th scope="row">{index + 1}</th>

                    <td>{application.name}</td>
                    <td>{application.email}</td>
                    <td>{application.address}</td>
                    <td>{application.region}</td>
                    <td>{application.city}</td>
                    <td>{application.phoneNumber}</td>
                    <td>{new Date(application.date).toLocaleDateString()}</td>

                    <td>
                      {application.CV && (
                        <a
                          className="btn btn-secondary"
                          href={application.CV}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View CV
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default CareerApplication;
