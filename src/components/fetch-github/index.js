import { useEffect, useState } from "react";
import axios from "axios";
import FetchedGithubCard from "./card";

export default function FetchGithub() {
  const [fetchedCard, setFetchedCard] = useState(null);

  const fetchCard = () => {
    axios
      .get(" https://api.github.com/users/badishd-icodice-edu")
      .then((res) => {
        if (res.status === 200) {
          setFetchedCard(res.data);
          console.log("HI")
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

  useEffect(() => {
    // api call
    fetchCard();
  }, []);

  return (
    <div>
      <FetchedGithubCard fetchedCardData={fetchedCard} />
    </div>
  );
}
