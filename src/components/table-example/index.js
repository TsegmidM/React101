import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useReducer } from "react";
import "./table.css";

const reduceData = () => {};
export default function TableExample() {
  const [randomData, setRandomData] = useState([]);
  const [data, updateData] = useReducer(reduceData, []);
  const tableHeader = [
    "    ",
    "Name",
    "Gender",
    "DOB",
    "Email",
    "Phone",
    "Username",
    "Employment",
    "Address",
    "Action",
  ];

  useEffect(() => {
    fetchRandomData();
  }, []);
  const fetchRandomData = () => {
    axios
      .get(`https://random-data-api.com/api/v2/users?size=10`)
      .then((res) => {
        if (res.status === 200) {
          setRandomData(res.data);
        }
      })
      .catch((err) => {
        if (err.status === 404) {
          console.error("Either your endpoint is wrong or no data found!");
        }
      })
      .finally((finallyP) => {
        console.log("request is completed!", finallyP);
      });
  };

  return (
    <div style={{margin:'10px'}}>
      <table style={{padding:'10px', border:'1px solid black'}}>
        <thead>
          <tr>
            {tableHeader.map((header, idx) => {
              return <th colspan={header==='Name' || header==='Action' ? '2' : '1'} key={idx}>{header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {
            randomData.map((oneData,idx)=>{
                return <tr key={idx}>
                    <td><img width="30px"src={oneData.avatar}/></td>
                    <td>{oneData.first_name}</td>
                    <td>{oneData.last_name}</td>
                    <td>{oneData.gender}</td>
                    <td>{oneData.date_of_birth}</td>
                    <td>{oneData.email}</td>
                    <td>{oneData.phone_number}</td>
                    <td>{oneData.username}</td>
                    <td><div>{oneData.employment.title}</div>
                    <div>{oneData.employment.key_skill}</div></td>
                    <td><div>{oneData.address.street_address}</div>
                    <div>{oneData.address.city},{oneData.address.state} {oneData.address.zip_code}</div></td>
                    <td>
                        <button>Edit</button>
                        <button>Delete</button>
                    </td>
                    
                </tr>
            })

          }
        </tbody>
      </table>
    </div>
  );
}
