import React, { useState } from "react";

const CounterComp = () => {
  const [count, setCount] = useState(0);
  const numbers = [1,10,-10,-1]
  console.log(count);

  return (
    <div>
      <div>{count}</div>
      {
        numbers.map((number,id) => {
          return (
            <button onClick={()=>{
              setCount(currState => currState + number)            
            }}>{number}</button>
          )
        })
      }

      {/* <button
        onClick={() => {
          setCount((currState) => {
            return currState + 1;
          });
        }}
      >+1
      </button>
      <button onClick={() => {
        setCount((currState) => {
            return currState + 10;
          });
      }}>+10</button>
      <button onClick={() => { setCount((currState) => {
            return currState - 10;
          });}}>-10</button>
      <button onClick={() => { setCount((currState) => {
            return currState - 1;
          });}}>-1</button> */}
    </div>
  );
};
export default CounterComp;
