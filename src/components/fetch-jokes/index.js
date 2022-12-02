import { useEffect, useState } from "react";
import axios from "axios";

export default function ChuchNorrisJokes() {
  const [newJoke, setNewJoke] = useState(null);

  const fetchJoke = () => {
    axios
      .get("https://api.chucknorris.io/jokes/random")
      .then((res) => {
        if (res.status === 200) {
          setNewJoke(res.data);
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
    fetchJoke();
  }, []);

  return (
    <div>
      <h3>{newJoke?.value}</h3>
      <button
        onClick={() => {
          fetchJoke();
        }}
      >
        Fetch Joke!
      </button>
    </div>
  );
}
