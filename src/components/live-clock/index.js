import React, { useState, useEffect } from "react";
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
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
    <Map
    {...viewport}
    onViewPortChange={(newView)=> setViewport(newView)}
    style={{width: 600, height: 400}}
    mapStyle="mapbox://styles/mapbox/dark-v9"
    mapboxAccessToken="pk.eyJ1IjoiZ2Fua2h1bHVnIiwiYSI6ImNsY2dtZnM4cTAybXQzdnA1aHhqb2U1NnkifQ.awd0eQDFkhJp7S_5cSPztQ"
    
    >
      <Marker
      offsetTop={(-viewport.zoom * 5) /2}
      latitude={37.9}
      longitude={-122.4}
      width={viewport.zoom * 5}
      height={viewport.zoom * 5}
      >
        

      </Marker>
    </Map>
  </div>;
};
export default LiveClock;
