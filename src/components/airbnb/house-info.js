import React from "react";
import Listing from "./listing";
import "./index.css"
const houseList = [
  {
    imgFile: "https://a0.muscache.com/im/pictures/bc8d77d4-e617-44ca-8b15-b8b2ce55df35.jpg?im_w=720",
    location: "Kenosha, Wisconsin",
    distance: "37 miles away",
    possibleDate: "Jan 2 - 7",
    rating: "★ 4.75",
    price: "$129",
  },
  {
    imgFile: "https://a0.muscache.com/im/pictures/6b6031b1-c50d-44fe-8636-1feb62697517.jpg?im_w=720",
    location: "Antioch, Illinois",
    distance: "30 miles away",
    possibleDate: "Oct 31 - Nov 5",
    rating: "★ 4.71",
    price: "$375",
  },
  {
    imgFile: "https://a0.muscache.com/im/pictures/0da028be-ea7e-41cf-9b62-268fddfb3b0a.jpg?im_w=720",
    location: "Trevor, Wisconsin",
    distance: "33 miles away",
    possibleDate: "Dec 5 - 10",
    rating: "★ 4.9",
    price: "$370",
  },
  {
    imgFile: "https://a0.muscache.com/im/pictures/miso/Hosting-53509299/original/e07ac9a7-a45f-474e-bbef-39abdf795e32.jpeg?im_w=720",
    location: "Michiana, Michigan",
    distance: "61 miles away",
    possibleDate: "Nov 13 - 18",
    rating: "★ 4.96",
    price: "$225",
  },
];

const HouseListing = () => {
  return (
    <div className="airbnb-container">
      {houseList.map((house, houseIdx) => {
        return <Listing house={house} key={houseIdx} />;
      })}
    </div>
  );
};
export default HouseListing;
