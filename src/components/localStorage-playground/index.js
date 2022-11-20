import React, { useState } from "react";

export default function LocalStoragePlayground() {
  const [sampleData, setSampleData] = useState("");
  return (
    <div>
      {sampleData}
      <br />
      <input
        value={sampleData}
        placeholder="Type..."
        onChange={(e) => setSampleData(e.target.value)}
      />
      <br />
      <button
        onClick={() => {
          localStorage.setItem("sampleData", sampleData);
        }}
      >
        {" "}
        Save to localStorage
      </button>
      <button
        onClick={() => {
          const localStorageData = localStorage.getItem("sampleData");
          setSampleData(localStorageData);
        }}
      >
        Read from localStorage
      </button>
      <button
        onClick={() => {
          localStorage.removeItem("sampleData");
        }}
      >
        Remove from localStorage
      </button>
      <button
        onClick={() => {
          localStorage.clear();
        }}
      >
        Clear localStorage
      </button>
    </div>
  );
}
