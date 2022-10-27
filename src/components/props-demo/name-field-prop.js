import React from "react";

const NameProp = (props) => {
  return(
     <div>{props.firstName.charAt(0) + "."} {props.lastName}</div>
     )

};
export default NameProp;
