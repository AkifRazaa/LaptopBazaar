import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Item = (props) => {
  // Check if props.photos is defined before accessing its elements
  const firstPhoto =
    props.photos && props.photos.length > 0 ? props.photos[0] : null;

  return (
    //     <div className="item">
    //       <Link to={`/post-detail/${props._id}`}>
    //         {firstPhoto && <img src={firstPhoto} alt="" />}{" "}

    //       </Link>

    //       <h5>{props.adTitle}</h5>
    //       <div className="item-prices">
    //         <div className="item-price-new">${props.price}</div>
    //         <div className="">{props.city}</div>
    //       </div>

    // </div>

    <div className="card-container">
      <div className="card card-style" style={{ width: "18rem" }}>
        <Link
          to={`/post-detail/${props._id}`}
          style={{ textDecoration: "none" }}
        >
          {firstPhoto && (
            <img src={firstPhoto} className="card-img-top" alt="" />
          )}

          <div class="card-body">
            <h5 className="card-title fw-bold">{props.adTitle}</h5>
            <p className="card-text">$ {props.price}</p>
            <p className="card-text">{props.city}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Item;
