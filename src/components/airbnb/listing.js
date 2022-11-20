import React from "react";
import "./index.css"
// import React, {useState} from "react";

const Listing = (props) => {
  return (
    <div className="airbnb-house-section">
      <div className="airbnb-house-img">
        <img className="airbnb-img" src={props.house.imgFile} />
        <div className="airbnb-house-hover-button">
          <button className="airbnb-house-button"> {"<"} </button>
          <button className="airbnb-house-button"> {">"} </button>
        </div>
      </div>
      <div className="airbnb-house-info">
        <div className="airbnb-row-1">
          <div className="airbnb-location">{props.house.location}</div>
          <span className="airbnb-rating">{props.house.rating}</span>
        </div>

        <div className="airbnb-distance">{props.house.distance}</div>
        <div className="airbnb-possibleDate">{props.house.possibleDate}</div>
        <div className="airbnb-price">
          {props.house.price} <span className="airbnb-price-span">night</span>
        </div>
      </div>
    </div>
  );
};

export default Listing;
