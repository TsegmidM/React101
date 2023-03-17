import React, { useState, useEffect } from "react";
const LiveClock = () => {
  const [viewport, setViewport] = useState({
    // latitude: 45.4211,
    // longitude: -75.6903,
     width: window.innerWidth,
     height: window.innerHeight,
    zoom: 2,
    pitch:40
  });

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

  return <div>
    
  </div>;
};
export default LiveClock;
