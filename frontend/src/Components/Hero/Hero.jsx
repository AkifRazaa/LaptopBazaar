import React from "react";
import "./Hero.css";

import hand_icon from "../../Assets/hand_icon.png";
import arrow_icon from "../../Assets/arrow.png";

const Hero = () => {
  return (
    <section className="home_banner_area">
      <div className="hero">
        <div className="hero-left">
          <h2>NEW ARRIVALS ONLY</h2>
          <div>
            <div className="hero-hand-icon">
              <p>New</p>
              <img src={hand_icon} alt="hand_icon" />
            </div>
            <p style={{ color: "#71cd14" }}>Collections</p>
            <p>for everyone</p>
          </div>

          {/* <div className="hero-latest-btn">
            <div>Latest Collection</div>
            <img src={arrow_icon} alt="arrow_icon" />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
