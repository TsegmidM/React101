import React from "react";
import starSolid from "./star-solid.svg";
import starRegular from "./star-regular.svg";

const StarRate = (props) => {
  // console.log(props.count);
  return (
      props.styled === "solid" ? (
        <img  style={{ width: 20, height: 20 }} src={starSolid} alt="solid star"/>
      ) : (
        <img style={{ width: 20, height: 20 }}  src={starRegular} alt="regular star" />
      )
  );
};
export default StarRate;
