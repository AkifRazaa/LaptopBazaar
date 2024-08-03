import React from "react";
import "./Card.css";
import money_bag from "../../Assets/money-bag.png";
import delievery_truck from "../../Assets/delivery-truck.png";
import headphone from "../../Assets/headphones.png";

const boxDetail = [
  {
    icon: money_bag,
    heading: "MONEY BACK GUARANTEE",
    text: "Shall open divide one",
  },

  {
    icon: delievery_truck,
    heading: "FREE DELIVERY",
    text: "Shall open divide one",
  },

  {
    icon: headphone,
    heading: "ALWAYS SUPPORT",
    text: "Shall open divide one",
  },
];

const Card = () => {
  return (
    <section className="container">
      {boxDetail.map((item, index) => (
        <div className="box" key={index}>
          <div className="box-content">
            <img className="box-icon" src={item.icon} alt="icon" />
            <h4>{item.heading}</h4>
            <p>{item.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Card;
