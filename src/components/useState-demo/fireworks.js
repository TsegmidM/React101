import React, { useState } from "react";

const FireworkState = () => {
  const [firework, setFirework] = useState(false);

  
  return (
    <div>
      {!firework ? (
        <div>
          <img
            style={{ width: 200 }}
            src="https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL2ZpcmV3b3Jrcy05LmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MjkwfX19"
          ></img>
        </div>
      ) : (
        <div>
          <img
            style={{ width: 300 }}
            src="https://media3.giphy.com/media/26tOZ42Mg6pbTUPHW/giphy.gif"
          ></img>
        </div>
      )}

      <button
        onClick={() => {
          setFirework((currState) => {
            return (currState = !currState);
          });
        }}
      >      
      {!firework ? "🧨" : "🎆" }
      Happy new year!
      </button>
    </div>
  );
};
export default FireworkState;
