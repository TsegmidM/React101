import React from "react";
import {useNavigate} from "react-router-dom";

const Page3 = () => {
    const navigate = useNavigate();
  
    return(
        <div>Page3
             <button
        onClick={() => {
          navigate(`/page-1`);
        }}
      >Back to Page 1</button>
      <button
        onClick={() => {
          navigate(`/page-2`);
        }}
      >Back to Page 2</button>
        </div>
    )
}
export default Page3;