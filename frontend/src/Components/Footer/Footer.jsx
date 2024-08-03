import React from "react";
import "./Footer.css";
import footer_logo from "../../Assets/logo_big.png";
import pintester_icon from "../../Assets/instagram.png";
import faceook_icon from "../../Assets/facebook.png";
import whatsapp_icon from "../../Assets/whatsapp.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>Laptop Bazzar</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products </li>
        <li>Offices </li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
          <img src={faceook_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={pintester_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={whatsapp_icon} alt="" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 - All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
