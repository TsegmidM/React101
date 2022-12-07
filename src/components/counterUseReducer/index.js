import { useReducer } from "react";

const reduceCounter = (currState, action) => {
  switch (action.type) {
    case "-":
      return currState - action.data;
    case "+":
      return currState + action.data;
    default:
      break; 
  }
};

export default function CounterUseReducer() {
  const [count, updateCount] = useReducer(reduceCounter, 0);
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => { 
        updateCount({ type: "-", data: 10 });}}>-10</button>
      <button
        onClick={() => {
          updateCount({ type: "-", data: 5 });}}>-5</button>
      <button
        onClick={() => {
          updateCount({ type: "+", data: 5 });}}>+5</button>
      <button
        onClick={() => {
          updateCount({ type: "+", data: 10 });}}>+10</button>
    </div>
  );
}
