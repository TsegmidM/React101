import React, { useState } from "react";
import { useEffect } from "react";
import EmployeeCard from "./card";
import EmployeeForm from "./form";
import "./emp-crud.css";

const EmployeeListCrud = () => {

  const [employeeData, setEmployeeData] = useState(
    localStorage.getItem("EmployeeData")
      ? JSON.parse(localStorage.getItem("EmployeeData"))
      : []);

  const [editingEmployeeData, setEditingEmployeeData] = useState(null);

    //add to localStorage
    useEffect(() => {
      localStorage.setItem("EmployeeData", JSON.stringify(employeeData));
    }, [employeeData]);
  
  const deleteCard = (card) => {
    setEmployeeData((currState) => currState.filter((v) => v.id !== card));
  };

  const editCard = (card) => {
    setEditingEmployeeData(card);
    console.log(editingEmployeeData);
  };
  const clearCard = () => {
    setEditingEmployeeData(null);
  }
  const submitCard = (inputData, value) => {
    if (editingEmployeeData) {
      setEmployeeData((currState) => {
        return currState.map((emp) =>
          emp.id === editingEmployeeData.id ? inputData : emp
        );
      });
      setEditingEmployeeData(null);
    } else {
      setEmployeeData((currState) => {
        return [
          ...currState,
          {
            ...inputData,
            id: currState.length + 1,
          },
        ];
      });
    }
    console.log(employeeData);
  };
  return (
    <div className="employeeListCrud">
      <div className="employee-form">
        <EmployeeForm
          editCard={editingEmployeeData}
          onFormSubmit={submitCard}
        />
      </div>
      <div className="card-container">
        {employeeData.map((value, idx) => {
          return (
            <EmployeeCard
              key={idx}
              info={value}
              deleteCard={deleteCard}
              editCard={() => editCard(value)}
              cardEdited= {editingEmployeeData && value.id===editingEmployeeData.id ? true : false} 
              clearCard = {clearCard}
            />
          );
        })}
      </div>
    </div>
  );
};
export default EmployeeListCrud;
