import React, { useState } from "react";

const DemoUseState = () => {
  const [ageJamiya, setAgeJamiya] = useState(18);
  const [address, setAddress] = useState("Rolling Meadows, IL");

  console.log(ageJamiya);
  const aUJ = () => {
    console.log("Jamiya is aging up");
    setAgeJamiya((currentState) => {
      return currentState + 1;
    });
  };

  return (
    <div>
      <div> Jamiya is {ageJamiya} years old!</div>
      <div> Address:  {address}</div>
      <button onClick={aUJ}>AGE UP JAMIYA</button>
      <button onClick={() => setAddress("Chicago, IL")}>{address}</button>
    </div>
  );
};
export default DemoUseState;
