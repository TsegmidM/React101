import React, { useState } from "react";

const DestructingJson = () => {
  const [data, setData] = useState(sampleData);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button
        onClick={() => {
          setData((currState) => ({
            ...currState,
            name: "Ziggy",
          }));
        }}
      >
        Change the name
      </button>

      <button
        onClick={() => {
          setData((prevState) => ({
            ...prevState,
            additionalData: {
              ...prevState.additionalData,
              favoriteHobbies: [
                ...prevState.additionalData.favoriteHobbies,
                "Cooking",
              ],
            },
          }));
        }}
      >
        Add another hobby
      </button>
      
      <button
        onClick={() => {
          setData((prevState) => ({
            ...prevState,
            additionalData: {
              ...prevState.additionalData,
              favoriteFood: {
                ...prevState.additionalData.favoriteFood,
                includeNoodle:false
              },
            },
          }));
        }}
      >
        No Noodle
      </button>
      <button
        onClick={() => {
          setData((prevState) => ({
            ...prevState,
            additionalData: {
             ...prevState.additionalData,
              moreDetails: {
                ...prevState.additionalData.moreDetails,
                hometown: {
                  ...prevState.additionalData.moreDetails.hometown,
                  state: "IL",
                },
              },
            },
          }));
        }}
      >
        Change Hometown
      </button>
      <button
        onClick={() => {
          setData((prevState) =>  ({
            ...prevState,
            additionalData: {
              ...prevState.additionalData,
              moreDetails: {
                ...prevState.additionalData.moreDetails,
                citiesLivedIn:[
                   ...prevState.additionalData.moreDetails.citiesLivedIn.filter(city => city !== 'Ulaanbaatar')
                ],
              },
            },
          })  );
        }}
      >
        Remove Ulaanbaatar
     </button>
     <button
        onClick={() => {
          setData((prevState) => ({
            ...prevState,
            additionalData: {
              ...prevState.additionalData,
              moreDetails: {
                ...prevState.additionalData.moreDetails,
                citiesLivedIn: [
                  ...prevState.additionalData.moreDetails.citiesLivedIn,
                   "Schaumburg",
                ],
              },
            },
          }));
        }}
      >
        Add Schaumburg
      </button>
      
      
    </div>
  );
};

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

export default DestructingJson;
