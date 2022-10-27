import React from "react";

const OwnerComponent = (props) => {
  console.log(props);
  return (
    <div>
      {props.people.owner} bought {props.people.carColor} {props.people.carYear}{" "}
      {props.people.carBrand}
    </div>
  );
};

export default OwnerComponent;