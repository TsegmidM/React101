import React, { useState } from "react";
import StarRate from "./starRate";

let starArr = [1, 2, 3, 4, 5];
const Star = () => {
  const [counter, setCount] = useState(0);

  return (
    <div>
      {starArr.map((star, id) => {
        return counter >= star ? (
          <span onClick={() => setCount(() => id + 1)}>
            <StarRate key={id} styled="filled" />
          </span>
        ) : (
          <span onClick={() => setCount(() => id + 1)}>
            <StarRate key={id} />
          </span>
        );
      })}
    </div>
  );
};
export default Star;
