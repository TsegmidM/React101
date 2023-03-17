import { useEffect, useState } from "react";
import axios from "axios";

export default function ApiCallPlayground() {
  const [data, setData] = useState([]);

  const [photoInfo, setPhotoInfo] = useState({ original: [], filtered: [] });

  const fetchPopulation = () => {
    axios
      .get("https://datausa.io/api/data?drilldowns=Nation&measures=Population")
      .then((res) => {
        setData(res.data.data.reverse());
      });
  };
  const fetchPhotoInfo = () => {
    axios.get("https://jsonplaceholder.typicode.com/photos").then((res) => {
      setPhotoInfo({ original: res.data, filtered: res.data });
    });
  };

  useEffect(() => {
    fetchPopulation();
    fetchPhotoInfo();
  }, []);
  return (
    <div>
      {data.map((item, idx) => {
        let changes = 0;
        if (idx > 0) changes = data[idx].Population - data[idx - 1]?.Population;
        return (
          <div key={idx}>
            <div>
              Year {item.Year}: {item.Population}{" "}
              {idx > 0 && (
                <span style={{ color: changes ? "green" : "red" }}>
                  {changes ? `(+ ${changes})` : `(- ${changes})`}
                </span>
              )}
            </div>
          </div>
        );
      })}
      {/* {JSON.stringify(photoInfo, null, 2)} */}
      <div>
        <input></input>
        {photoInfo.filtered.map((photo, idx) => {
          return (
            <span
              key={idx}
              style={{
                border: "1px solid",
                borderRadius: "5px",
                marginRight: "10px",
                alignItems: "center",
              }}
            >
              <img src={photo.url} width="20px"></img>
              <span>{photo.title}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
