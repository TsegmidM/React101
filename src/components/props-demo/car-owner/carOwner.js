import React from "react";
import OwnerComponent from "./person"


const carOwners = [
  { owner: "Anar", carBrand: "Audi", carYear: "2022", carColor: "red" },
  { owner: "Jaagii", carBrand: "BMW", carYear: "2022", carColor: "black" },
  { owner: "James", carBrand: "Mercedes", carYear: "2022", carColor: "yellow" },
  { owner: "Mandakh", carBrand: "Bentley", carYear: "2022", carColor: "white" },
];

const CarOwners = () => {
  return (
    <div class="list1">
      {carOwners.map((people, nameIdx) => {
        return <OwnerComponent people={people} key={nameIdx} />;
      })}
    </div>
  );
};

export default CarOwners;
