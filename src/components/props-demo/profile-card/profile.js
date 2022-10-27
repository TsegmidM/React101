import React from "react";
import "./profile-card.css"

const Profile = (props) => {
  let lastName = props.name.split(" ");
  return (
    <div className="profile-card">
      <div className="p-card-icon">
        {props.name.charAt(0)}
        {lastName[1].charAt(0)}
      </div>
      <div className="p-card-info">
        <div className="pname">{props.name}</div>
        <div className="title">{props.title}</div>
      </div>
    </div>
  );
};
export default Profile;
