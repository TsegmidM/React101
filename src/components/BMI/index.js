import React, { PureComponent } from "react";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./index.css";

const BMITracker = () => {
  const [bmiData, setBmiData] = useState({
    height: "",
    weight: "",
  });
  const [bmiIndex, setBmiIndex] = useState([]);
  const [byMetric, SetByMetric] = useState(true);

  const onInputChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setBmiData((currState) => ({
      ...currState,
      [fieldName]: fieldValue,
    }));
    console.log("called", bmiData);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    let bmiByLb = ((bmiData.weight / bmiData.height ** 2) * 703).toFixed(1);
    let bmiByMetric = (bmiData.weight / (bmiData.height / 100) ** 2).toFixed(1);

    setBmiIndex((currState) => {
        return [
            ...currState,
        {
          BMI: byMetric ? bmiByMetric : bmiByLb,
          date: new Date().toString().slice(0, 10),
        },
        ]
  });
  setBmiData({
    height: "",
    weight: "",
  });
    console.log(bmiIndex);
    console.log("BMI by LB:", bmiByLb);
    console.log("BMI by Metric:", bmiByMetric);
  };

  return (
    <div className="bmi-tracker">
      <div> BMI TRACKER {byMetric ? "by metric" : "by lbs"}</div>
      {/* <div>BMI by lb is : {JSON.stringify(bmiIndex)}</div> */}
      {/* <div>{bmiData}</div> */}
      <button onClick={()=>{
        SetByMetric(!byMetric);
      }}> {byMetric ? "Change to Pound system" : "Change to Metric system" } </button>
      <form className="bmi-form" onSubmit={onFormSubmit}>
        <label className="bmi-label">
          {byMetric ? "cm: " : "Inch: "}
          <input
            placeholder="Enter your height"
            className="bmi-height"
            name="height"
            required
            type="number"
            value={bmiData.height} 
            onChange={(e) => {
              onInputChange(e);
            }} 
          />
        </label>
        <label className="bmi-label">
        {byMetric ? "kg: " : "lb: "}
          <input
            placeholder="Enter your weight"
            className="bmi-weight"
            name="weight"
            required
            type="number"
            value={bmiData.weight}
            onChange={(e) => {
              onInputChange(e);
            }}
          />
          </label>
        <button
          className="bmi-submit-button"
          type="submit"
          onClick={()=>{
           
          }}
        >
          Calculate
        </button>
      </form>

      <LineChart
      className="LineChart"
        width={700}
        height={300}
        data={bmiIndex.slice(-7)}
        margin={{
          top: 15,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
        dataKey= "date"
        />
        <YAxis 
       dataKey="BMI"/>
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="BMI"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};
export default BMITracker;
