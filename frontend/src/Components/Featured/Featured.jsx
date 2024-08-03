import React from "react";
import "./Featured.css";

import product_data from "../../Assets/data";
import Item from "../Item/Item";

const Featured = () => {
  return (
    <div className="popular">
      <h1>FEATURED PRODUCTS</h1>
      <hr />
      <div className="popular-item">
        {product_data.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Featured;
