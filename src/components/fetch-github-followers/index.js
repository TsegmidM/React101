import { useEffect, useState } from "react";
import axios from "axios";
import FetchedGithubFollowers from "./followers-card";

export default function FetchGithubFollowers() {
  const [fetchedFollowers, setFetchedFollowers] = useState(null);
  const [githubName,setGithubName] = useState("badishd-icodice-edu");

  const fetchFollowers = () => {
    axios
      .get(`https://api.github.com/users/${githubName}/followers`)
      .then((res) => {
        if (res.status === 200) {
          setFetchedFollowers(res.data);
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
    fetchFollowers();
  }, [githubName]);

  return (
    <div>
      <div style={{display:"flex",justifyContent:"center"}}>
        <h4>{githubName}'s followers</h4>
      </div>
      <div className="fetched-github-followers">
        {fetchedFollowers?.map((value, idx) => {
          return <FetchedGithubFollowers key={idx} 
          fetchedCardData={value} 
          chooseGithubName={(chosenGitHubName)=>{
            setGithubName(chosenGitHubName);
          }}
          />;
        })}
      </div>
    </div> 
  );
}
