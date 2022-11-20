import React, { useState } from "react";
import { useEffect } from "react";
import "./index.css";
import { FaEdit } from "react-icons/fa";
import { MdCancel, MdDelete } from "react-icons/md";
import { clear } from "@testing-library/user-event/dist/clear";

const EmployeeCard = ({
  info,
  deleteCard,
  editCard,
  cardEdited,
  clearCard,
}) => {
  const avatar = info.avatar;
  const firstName = info.firstName;
  const lastName = info.lastName;
  const role = info.role;
  const company = info.company;
  const address1 = info.address.address1;
  const address2 = info.address.address2;
  const city = info.address.city;
  const state = info.address.state;
  const zipcode = info.address.zipcode;
  const phone = info.phone;

  return (
    <div className="employee-card">
      <div className="card-context">
        <div>
          <img className="employee-img" src={avatar} />
        </div>
        <h3>
          {firstName} {lastName}
        </h3>
        <div>{role}</div>
        <div>
          <b>{company}</b>
        </div>
        <div>
          {address1} {address2 !== "" ? `, ${address2}` : ""}
        </div>
        <div>
          {city}, {state} {zipcode}
        </div>
        <div>{phone}</div>
      </div>
      {!cardEdited ? (
        <div className="card-button-container">
          <button
            className="employee-card-button"
            onClick={() => {
              editCard();
            }}
          >
            <FaEdit />
            Edit
          </button>
          <button
            className="employee-card-button"
            onClick={() => {
              deleteCard(info.id);
            }}
          >
            <MdDelete /> Delete
          </button>
        </div>
      ) : (
        <div className="card-button-container">
          <button
            className="employee-card-button"
            onClick={() => {
              clearCard();
            }}
          >
            <MdCancel/> 
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
export default EmployeeCard;
