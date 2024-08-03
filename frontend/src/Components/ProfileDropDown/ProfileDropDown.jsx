import React from "react";
import { Link } from "react-router-dom";
import profilePic from "../../Assets/profilePic.png"

const ProfileDropDown = ({handleLogout}) => {
  return (
    <div className="dropdown">
      <Link
        className="dropdown-toggle"
        to="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img src={profilePic} alt="" />
      </Link>

      <ul className="dropdown-menu">
        <li>
          <Link className="dropdown-item" to="/my-posts">
            My Posts
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="#">
            Another action
          </Link>
        </li>
        <li><hr className="dropdown-divider" /></li>
        <li>
          <Link onClick={handleLogout} className="dropdown-item" to="/">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropDown;
