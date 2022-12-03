import { useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { useState, useEffect } from "react";
import FetchedGithubFollowers from "./followers-card";
export default function FetchedFollowerDetails() {
  const { githubfollowersname } = useParams();
  const [fetchedGithubFollowers, setFetchedGithubFollowers] = useState(null);

  const fetchFollowerDetails = () => {
    axios
      .get(`https://api.github.com/users/${githubfollowersname}`)
      .then((res) => {
        if (res.status === 200) {
          setFetchedGithubFollowers(res.data);
          console.log("HI");
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
    fetchFollowerDetails();
  }, []);

  return (
    <div>
      <FetchedGithubFollowers fetchedCardData={fetchedGithubFollowers} />
    </div>
  );
}
