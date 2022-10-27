import React, { useState } from "react";
import StarRate from "./starRate";

let starArr = [1,2,3,4,5];
const Star = () => {
  const [counter, setCount] = useState(0);

  return (
    <div>
      {starArr.map((star, id) => {
        return counter >= star ? (
          <span onClick={() => setCount(() => star)}>
            <StarRate key={id} styled="solid" />{star}
          </span>
        ) : (
          <span onClick={() => setCount(() => star)}>
            <StarRate key={id} />{star}
          </span>
        );
      })}
    </div>
  );
};
export default Star;
