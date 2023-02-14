import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function Interview1Task2() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(apiEndpoint).then((res) => setData(res.data));
  }, []);
  return (
    <div className="flex">
      {data.map((info, idx) => {
        return <Task2Card key={info.id} info={info} />;
      })}
    </div>
  );
}
const Task2Card = ({ info }) => {
  return (
    <div className="flex flex-col mr-2 w-96 h-48 divide-black border border-black rounded ">
      <div className=" flex h-1/4 m-2 items-center p-2 w-9/10 border-b-2">
        <span className="flex w-1/10">
          <span className="rounded flex bg-gray-300 h-10 w-10">
            <img src={info.avatar}></img>
          </span>
        </span>
        <div className="ml-2 w-full">
          <div>
            {info.first_name} {info.last_name}
          </div>
          <div className="text-xs">{info.username}</div>
        </div>
        <div
          className={`m-2 rounded-full flex items-center justify-center text-lg w-1/2 font text-white ${
            info.subscription.plan === "Standard"
              ? "bg-purple-400"
              : info.subscription.plan === "Starter"
              ? "bg-green-400"
              : info.subscription.plan === "Gold"
              ? "bg-yellow-400"
              : "bg-blue-500"
          }  `}
        >
          {info.subscription.plan}
        </div>
      </div>
      <div className="flex flex-wrap justify-between h-3/4 m-2">
        {[
          { label: "Gender", value: info.gender },
          { label: "Phone", value: info.phone_number },
          { label: "Email", value: info.email },
          { label: "DOB", value: info.date_of_birth },
        ].map((item, idx) => {
          return (
            <div key={idx}>
              <div>{item.label}</div>
              <div>{item.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const apiEndpoint = "https://random-data-api.com/api/v2/users?size=4";
