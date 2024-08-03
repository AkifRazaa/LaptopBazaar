import React from "react";
 import "./Offers.css";
import carousel1 from "../../Assets/carousel1.jpg"
import carousel2 from "../../Assets/carousel2.jpg"


const Offers = () => {
  return (
    //OLD OFFER WITH IMAGE AND TEXT REPLACED WITH CAROUSEL

    // <section className="offer-bg">
    //   <div className="offers-left">
    //     <h1>Exclusive</h1>
    //     <h1>Offers For You</h1>
    //     <p>ONLY ON BEST SELLERS PRODUCTS</p>
    //     {/* <button>Check Now</button> */}
    //   </div>
    // </section>

    <div className="Width100">
    <div id="carouselExample" className="carousel slide Marin-Top-30px">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={carousel1} className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src={carousel2} className="d-block w-100" alt="..." />
    </div>
    
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
</div>
  );
};

export default Offers;
