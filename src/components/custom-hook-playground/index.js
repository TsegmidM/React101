import { Button } from "antd";
import useCounter from "./custom-hook";
import {useNumberValidator} from './custom-hook'

export default function CustomHookPlayground() {
  const [count, increment, decrement] = useCounter(3);
  const [zipCode, setZipCode] = useNumberValidator('');

  return (
    <div>
      {count}
      <Button onClick={increment}>+</Button>
      <Button onClick={decrement}>-</Button>
      <br></br>
      <hr></hr>
      ZIP: {zipCode}
      <div>
      <input 
    //   type='number'
      value={zipCode}
      onChange={(e)=>{
        setZipCode(e.target.value)
      }}
      ></input>
      </div>
    </div>
  );
}
