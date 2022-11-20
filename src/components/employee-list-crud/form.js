import React, { useState } from "react";
import { useEffect } from "react";
import EmployeeCard from "./card";
import avatar1 from "./images/avatar1.png";
import avatar2 from "./images/avatar2.png";
import avatar3 from "./images/avatar3.png";
import avatar4 from "./images/avatar4.png";
import avatar5 from "./images/avatar5.png";
import avatar6 from "./images/avatar6.png";
import avatar7 from "./images/avatar7.png";
import avatar8 from "./images/avatar8.png";

const avatar = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
];
const EmployeeForm = (props) => {
  const [inputField, setInputField] = useState({
    firstName: "",
    lastName: "",
    role: "",
    company: "",
    address: {
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipcode: "",
    },
    phone: "",
  });

  useEffect(() => {
    if (props.editCard !== null) {
      setInputField(props.editCard);
    } else {
      setInputField({
        firstName: "",
        lastName: "",
        role: "",
        company: "",
        address: {
          address1: "",
          address2: "",
          city: "",
          state: "",
          zipcode: "",
        },
        phone: "",
      });
    }
  }, [props.editCard]);

  //console.log(props.editCard)

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (props.editCard === null) {
      props.onFormSubmit({
        ...inputField,
        avatar: avatar[Math.floor(Math.random() * avatar.length)],
      });
    } else {
      props.onFormSubmit({ ...props.editCard, ...inputField });
    }

    setInputField({
      firstName: "",
      lastName: "",
      role: "",
      company: "",
      address: {
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipcode: "",
      },
      phone: "",
    });
    // console.log(employeeData);
  };

  function formatPhoneNumber(value) {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7)
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;

    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  }

  const onInputChange = (e) => {
    if (
      e.target.name === "address1" ||
      e.target.name === "address2" ||
      e.target.name === "city" ||
      e.target.name === "state" ||
      e.target.name === "zipcode"
    ) {
      setInputField((currState) => ({
        ...currState,
        address: {
          ...currState.address,
          [e.target.name]: e.target.value,
        },
      }));
    } else if (e.target.name === "phone") {
      const formattedPhoneNumber = formatPhoneNumber(e.target.value);
      setInputField((currState) => ({
        ...currState,
        phone: formattedPhoneNumber,
      }));
    } else {
      setInputField((currState) => ({
        ...currState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  return (
    <div className="employee-form">
      <form  onSubmit={onFormSubmit}>
        {Object.keys(inputField).map((value, idx) => {
          return value === "address" ? (
            <div key={idx}>
              <div>{value} :</div>
              <input
                placeholder={`enter your ${value}`}
                type="text"
                name="address1"
                required
                value={inputField.address.address1}
                onChange={(e) => {
                  onInputChange(e);
                }}
              />
              <div>
                <div>address 2 :</div>
                <input
                  placeholder="Optional..."
                  name="address2"
                  type="text"
                  value={inputField.address.address2}
                  onChange={(e) => {
                    onInputChange(e);
                  }}
                />
              </div>
              <div>
                <div>city :</div>
                <input
                  placeholder="enter your city"
                  name="city"
                  type="text"
                  maxLength="32"
                  required
                  value={inputField.address.city}
                  onChange={(e) => {
                    onInputChange(e);
                  }}
                />
              </div>
              <div>
                <div>state:</div>
                <input
                  placeholder="enter your state"
                  name="state"
                  required
                  type="text"
                  value={inputField.address.state}
                  onChange={(e) => {
                    onInputChange(e);
                  }}
                />
              </div>
              <div>
                <div>zip code:</div>
                <input
                  placeholder="enter your zipcode"
                  required
                  name="zipcode"
                  maxLength="10"
                  type="number"
                  value={inputField.address.zipcode}
                  onChange={(e) => {
                    onInputChange(e);
                  }}
                />
              </div>
            </div>
          ) : value === "phone" ? (
            <div key={idx}>
              <div>phone :</div>
              <input
                placeholder={`enter your phone number`}
                required
                name="phone"
                type="text"
                maxLength="16"
                value={inputField.phone}
                onChange={(e) => {
                  onInputChange(e);
                }}
              />
            </div>
          ) : value !== "avatar" && value !== "id" ? (
            <div key={idx}>
              <div>{value} :</div>
              <input
                placeholder={`enter your ${value}`}
                required
                name={value}
                maxLength="35"
                type="text"
                value={inputField[value]}
                onChange={(e) => {
                  onInputChange(e);
                }}
              />
            </div>
          ) : (
            ""
          );
        })}
        <button className="crud-submit-button" type="submit" onClick={() => {}}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default EmployeeForm;
