import React from "react";
// import App from "../App";
// import "./App.css";
// import React, {useState} from "react";

const Listing = (props) => {
  return (
    <div className="house-section">
      <div className="house-img">
        <img src={props.house.imgFile} />
        <div className="house-hover-button">
          <button className="house-button"> {"<"} </button>
          <button className="house-button"> {">"} </button>
        </div>
      </div>
      <div className="house-info">
        <div className="row-1">
          <div className="location">{props.house.location}</div>
          <span className="rating">{props.house.rating}</span>
        </div>

        <div className="distance">{props.house.distance}</div>
        <div className="possibleDate">{props.house.possibleDate}</div>
        <div className="price">
          {" "}
          {props.house.price} <span className="price-span">night</span>
        </div>
      </div>
    </div>
  );
};

export default Listing;
