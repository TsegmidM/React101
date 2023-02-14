import { Button } from "antd";
import { useState } from "react";
import Interview1Task2 from "./task2";

export default function Interview1() {
  // create a state that stores the sampleData as an initial state
  const [data, SetData] = useState(sampleData);
  // implement the following Buttons
  // make sure change the sampleData with your state name
  return (
    <div className="flex w-full justify-between">
        <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Button
        onClick={() => {
          SetData((currstate) => {
            return {
              ...currstate,
              additionalData: {
                ...currstate.additionalData,
                moreDetails: {
                  ...currstate.additionalData.moreDetails,
                  hometown: {
                    city: "Chicago",
                    state: "IL",
                  },
                },
              },
            };
          });
        }}
      >
        Change hometown to Chicago
      </Button>
      <Button
        onClick={() => {
          SetData((currstate) => {
            return {
              ...currstate,
              additionalData: {
                ...currstate.additionalData,
                moreDetails: {
                  ...currstate.additionalData.moreDetails,
                  numberOfSiblings:
                    currstate.additionalData.moreDetails.numberOfSiblings + 1,
                },
              },
            };
          });
        }}
      >
        Increment numberOfSiblings by 1. It can increment many times.
      </Button>
      <Button
        onClick={() => {
          SetData((currstate) => {
            return {
              ...currstate,
              additionalData: {
                ...currstate.additionalData,
                favoriteHobbies: [
                  ...currstate.additionalData.favoriteHobbies,
                  "Coding",
                ],
              },
            };
          });
        }}
      >
        Add a new hobby to favoriteHobbies
      </Button>
      </div>
      <Interview1Task2 />
    </div>
  );
}

const sampleData = {
  name: "John",
  additionalData: {
    instructor: true,
    favoriteHobbies: ["Coding", "Playing Basketball"],
    favoriteFood: {
      type: "soup",
      includeNoodle: true,
    },
    moreDetails: {
      favoriteBasketballPlayer: "Kyrie Irving",
      numberOfSiblings: 5,
      isYoungest: true,
      hometown: {
        city: "Portland",
        state: "OR",
      },
      citiesLivedIn: ["Portland", "Chicago", "Ulaanbaatar"],
    },
  },
};
