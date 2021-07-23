import React from "react";
import Slider from "./Slider";
import CatProdView from "./CatProdView";

const HomePage = () => {
  return (
    <>
      <Slider />
      <div className="container my-5">
        <CatProdView />
      </div>
    </>
  );
};

export default HomePage;
