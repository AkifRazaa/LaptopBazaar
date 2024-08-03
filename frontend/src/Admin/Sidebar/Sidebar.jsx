import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";

const Sidebar = ({ links, isAdmin }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const linkStyle = {
    margin: "8px 0px",
    borderRadius: "6px",
    fontWeight: 600,
    fontSize: "medium",
    textDecoration: "none",
  };

  return (
    <>
      <div
        className={`w3-sidebar w3-bar-block w3-collapse w3-card w3-animate-left ${
          sidebarOpen ? "w3-show" : "w3-hide-small"
        }`}
        style={{ width: "220px", height: "100vh" }}
        id="mySidebar"
      >
        <button
          className="w3-bar-item w3-button w3-large w3-hide-large"
          onClick={handleSidebarClose}
        >
          Close &times;
        </button>
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            className="w3-bar-item w3-button "
            style={linkStyle}
          >
            {link.icon} {link.label}
          </Link>
        ))}
        {isAdmin && (
          <div className="w3-dropdown-hover" style={linkStyle}>
            <button className="w3-button">
              <FaRegUser style={{ fontSize: "20px", marginRight: "10px" }} />{" "}
              Inspectors <i className="fa fa-caret-down"></i>
            </button>
            <div className="w3-dropdown-content w3-bar-block">
              <Link
                to="/admin/add-inspector"
                className="w3-bar-item w3-button"
                style={{ marginLeft: "20px" }}
              >
                Add Inspector
              </Link>
              <Link
                to="/admin/manage-inspector"
                className="w3-bar-item w3-button"
                style={{ marginLeft: "20px" }}
              >
                Manage Inspector
              </Link>
            </div>
          </div>
        )}
      </div>

      <button
        className="w3-button w3-teal w3-xlarge w3-hide-large"
        onClick={handleSidebarOpen}
      >
        &#9776;
      </button>
    </>
  );
};

export default Sidebar;
