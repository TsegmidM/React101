import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function Interview3() {
  const [currentPage, setCurrentPage] = useState({
    address: "people",
    page: 0,
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = () => {
    axios.get(`https://swapi.dev/api/${currentPage.address}`).then((res) => {
      if (res.status === 200) {
        setData(res.data);
      }
    });
  };
  return (
    <div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <table className="w-1/2">
        <thead >
          <tr className="border-2 border-black bg-purple-200 ">
            {[
              "Name",
              "Birth Year",
              "Gender",
              "Height",
              "Mass",
              "Eye Color",
              "Hair Color",
              "Skin Color",
            ].map((item, idx) => (
              <th key={idx} className="border-2 max-w-max">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        {data.results?.map((d, idx) => {
          return (
            <tbody key={idx}>
              <tr>
                {[
                  d.name,
                  d.birth_year,
                  d.gender,
                  d.height,
                  d.mass,
                  d.eye_color,
                  d.hair_color,
                  d.skin_color,
                ].map((item, idx) => (
                  <td key={idx} className="border max-w-max">
                    {item}
                  </td>
                ))}
              </tr>
            </tbody>
          );
        })}
      </table>
      <nav>
        <ul className="pagination flex w-full">
          {Array.apply(null, Array(10)).map((number, idx) => {
            return (
              <li
                style={{
                  backgroundColor: currentPage.page === idx + 1 && "lightblue",
                }}
                key={idx}
                className="mr-2 mt-2 border w-10 flex justify-center hover:bg-blue-100"
                onClick={() => {
                  setCurrentPage({
                    address: `people?page=${idx + 1}`,
                    page: idx + 1,
                  });
                }}
              >
                {idx + 1}
              </li>
            );
          })}
          <li className="flex items-center text-sm">Showing {data.results?.length} datas per Page</li>
        </ul>
      </nav>
    </div>
  );
}
