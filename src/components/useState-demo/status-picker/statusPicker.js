import React, { useState } from "react";
import "./statusPicker.css";

const StatusPicker = () => {
  const [status, setStatus] = useState("Active");

  return (
    <div>
      <div className="status-wrapper">
        <h2 className={status.toLowerCase()}>{status}</h2>
      </div>
      {["Active", "Away", "Busy", "Offline"].map((st, stIdx) => (
        <button onClick={() => setStatus(st)} key={stIdx}>
          {st}
        </button>
      ))}
    </div>
  );
};
export default StatusPicker;
