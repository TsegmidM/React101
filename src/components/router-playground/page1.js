import React from "react";
import {useNavigate} from "react-router-dom";

const Page1 = () => {
  const navigate = useNavigate();
  return (
    <div>
      Page1
      <button
        onClick={() => {
          navigate(`/page-2`);
        }}
      >To Page 2</button>
            <button
        onClick={() => {
          navigate(`/page-3`);
        }}
      >To Page 3</button>

    </div>
  );
};
export default Page1;
