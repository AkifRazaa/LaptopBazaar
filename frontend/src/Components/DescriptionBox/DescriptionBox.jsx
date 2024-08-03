import React from "react";
import "./DescriptionBox.css";

function DescriptionBox({ description }) {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        {/* <div className="descriptionbox-nav-box fade">Reviews (122) </div> */}
      </div>

      <div className="descriptionbox-description">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default DescriptionBox;
