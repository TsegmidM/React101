import React, { useState, useEffect } from "react";

const LiveClock = () => {
  const [currentTime, setCurrentTime] = useState(
    Date().toString().slice(0, 25)
  );
  useEffect(() => {
    const counterInterval = setInterval(() => {
      setCurrentTime(Date().toString().slice(0, 25));
    }, 1000);

    return () => {
      clearInterval(counterInterval);
    };
  }, []);

  return <div>{currentTime}</div>;
};
export default LiveClock;
