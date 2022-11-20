import React from "react";
import {useNavigate} from "react-router-dom";

const Page2 = () => {
    const navigate = useNavigate();
  return (
    <div>
      Page2
      <button
        onClick={() => {
          navigate(`/page-1`);
        }}  
      >To Page 1</button>
      <button
        onClick={() => {
          navigate(`/page-3`);
        }}
      >To Page 3</button>
    </div>
  );
};
export default Page2;
