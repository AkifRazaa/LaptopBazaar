import React from "react";
import Hero from "../Components/Hero/Hero";
import Card from "../Components/Card/Card";
import Offers from "../Components/Offers/Offers";
import NewCollection from "../Components/NewCollection/NewCollection";
import RecentPost from "../Components/RecentPost/RecentPost";
import Filter from "../Components/Filter/Filter";
import FeaturedPost from "../Components/FeaturedPost/FeaturedPost";

const Shop = () => {
  return (
    <div>
      <Filter />
      {/* <Hero /> */}
      <Offers />
      <Card />
      {/* <Featured /> */}
      <FeaturedPost />
      <RecentPost />
      {/* <NewCollection /> */}
    </div>
  );
};

export default Shop;
