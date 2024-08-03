import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css";
import logo from "../../Assets/logo.png";

import ProfileDropDown from "../ProfileDropDown/ProfileDropDown";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  let navigate = useNavigate();

  const authToken = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userID"); // Get sender's user ID from localStorage

  const handleLogout = () => {
    localStorage.removeItem("userID");
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    console.log("Tokens removed");

    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          <img src={logo} alt="Logo" />
          <span className="ms-2">Laptop Bazzar</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <GiHamburgerMenu />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to={"/"}>
                Home
              </Link>
            </li>

            {/* Only show if the user is logged in  */}
            {authToken && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to={`/chat/${userId}`}>
                    Chat
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/my-posts">
                    My Posts
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/career">
                    Career
                  </Link>
                </li>
              </>
            )}

            <li className="nav-item">
              <Link className="nav-link" to={"/contact"}>
                Contact
              </Link>
            </li>
          </ul>

          <div className="nav-login-cart">
            {authToken ? (
              <>
                <Link to={"/post"}>
                  <button>Sell</button>
                </Link>

                <Link onClick={handleLogout} to="/">
                  <button>Logout</button>
                </Link>
              </>
            ) : (
              <Link to={"/user/login"}>
                <button>Login</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
