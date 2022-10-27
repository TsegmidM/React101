import React, {useState} from "react";

const DestructingJson = () => {
  const [data, setData] = useState(sampleData);
    return(
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
            <button  onClick={()=>{
              
//              <pre>{JSON.stringify(sampleData, null, 2)}</pre>   
            }}>Change the name</button>
            <button  onClick={()=>{

            }}>Add another hobby</button>
            <button  onClick={()=>{

            }}>Include noodle</button>
            
        </div>
    )

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

export default DestructingJson;