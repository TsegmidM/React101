import React, { useState } from "react";

const DemoUseStateObj = () => {
  const [bootcamp, setBootcamp] = useState({
    studentCount: 12,
    isPartTime: true,
    isFinished: false,
  });

  return (
    <div>
      <pre>{JSON.stringify(bootcamp, null, 2)}</pre>
      {bootcamp.isFinished && <div> Don't forget to do your homework!</div> }

      <button onClick={() => {
        setBootcamp(currState => {
            return {
                ...currState,
                isFinished: !currState.isFinished,
            }
        })
      }}> {bootcamp.isFinished ? 'Finished' : 'finish class'} </button>
    </div>
  );
};
export default DemoUseStateObj;
