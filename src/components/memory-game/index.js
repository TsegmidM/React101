import React, { useEffect, useState } from "react";
import "./memory-game.css";
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
import img5 from "./images/5.jpg";
import img6 from "./images/6.jpg";
import img7 from "./images/7.jpg";
import img8 from "./images/8.jpg";

const cards = [
  { value: img1, id: 1 },
  { value: img2, id: 2 },
  { value: img3, id: 3 },
  { value: img4, id: 4 },
  { value: img5, id: 5 },
  { value: img6, id: 6 },
  { value: img7, id: 7 },
  { value: img8, id: 8 },
];

const MemoryGame = () => {
  // a state that saves a list of cards - array (making it a state so that we can shuffle later)
  const [listOfCards, setListOfCards] = useState(
    [...cards, ...cards].sort(() => (Math.random() > 0.5 ? 1 : -1))
  );
  // const [listOfCards, setListOfCards] = useState([...cards, ...cards]);

  // a state that saves whose turn it is - boolean
  const [IsP1Next, setIsP1Next] = useState(true);
  // a state that saves all the turned cards, so it stays flipped - array
  const [turnedCards, setTurnedCards] = useState({});
  // a state that saves the 2 flipped cards - object (keys would be locations, values would be cards)
  const [twoFlipped, setTwoFlipped] = useState({});

  // later add a stata that saves the scores of the players - object
  const [score, setScore] = useState({ P1: 0, P2: 0 });
  // later add a state that saves the winner result - initial value would null, when the game ends, it becomes a string
  const [isWin, setIsWin] = useState(null);

  useEffect(() => {
    if (Object.keys(twoFlipped).length === 2) {
      const [firstCard, secondCard] = Object.keys(twoFlipped);
      if (twoFlipped[firstCard].cardId === twoFlipped[secondCard].cardId) {
        setTurnedCards((currState) => ({
          ...currState,
          [firstCard]: twoFlipped[firstCard],
          [secondCard]: twoFlipped[secondCard],
        }));
        console.log(turnedCards);

        setScore((currState) => ({
          ...currState,
          [IsP1Next ? "P1" : "P2"]: currState[IsP1Next ? "P1" : "P2"] + 1,
        }));
        setTwoFlipped({});
      } else {
        setTimeout(() => {
          setTwoFlipped({});
          setIsP1Next(!IsP1Next);
        }, 1000);
      }
    }

    if (Object.keys(turnedCards).length === 16) {
      setTwoFlipped(0);
      if (score.P1 > score.P2) {
        setIsWin("P1");
      } else if (score.P2 > score.P1) {
        setIsWin("P2");
      } else setIsWin("Draw");
    }
  }, [twoFlipped]);
  // it should update the currently flipped cards state, so that the cards flip immediately
  // depending on how many of the 2 current flipped cards are flipped, check if the cards match
 
  return (
    <div className="memory-game-container">
      <div>
        <button
          className="memory-game-start-button"
          onClick={() => {
            setIsP1Next(true);
            setTwoFlipped({});
            setIsWin(null);
            setTurnedCards({});
            setScore({ P1: 0, P2: 0 });
            setListOfCards(
              [...cards, ...cards].sort(() => (Math.random() > 0.5 ? 1 : -1))
            );
          }}
        >
          New Game
        </button>
      </div>
      <div className="memory-game-section2">
        <div>
          <h1 className="memory-game-h1">
            {!isWin
              ? IsP1Next
                ? "Your turn"
                : ""
              : isWin === "P1"
              ? "You Won"
              : isWin === "Draw"
              ? "Draw!"
              : ""}
          </h1>
          <h2 className="memory-game-h2">
            Player 1's score:<br></br>
            {score.P1}
          </h2>
        </div>
        <div className="memory-game-board">
          {listOfCards.map((cell, idx) => {
            return (
              <div
                className="memory-game-cell"
                key={idx}
                onClick={() => {
                  Object.keys(twoFlipped).length < 2 &&
                    !turnedCards[idx] &&
                    setTwoFlipped((currState) => ({
                      ...currState,
                      [idx]: {
                        cardId: cell.id,
                        value: cell.value,
                        player: IsP1Next ? "P1" : "P2",
                      },
                    }));
                }}
              >
                {turnedCards[idx] || twoFlipped[idx] ? (
                  <img
                    className="memory-game-img"
                    src={
                      turnedCards[idx]
                        ? turnedCards[idx].value
                        : twoFlipped[idx].value
                    }
                  />
                ) : (
                  <h1 style={{ color: "red" }}>?</h1>
                )}
              </div>
            );
          })}

          {/* render the cards */}
          {/* each card has a click event handler  */}
        </div>
        <div>
          <h1 className="memory-game-h1">
            {!isWin
              ? !IsP1Next
                ? "Your turn"
                : ""
              : isWin === "P2"
              ? "You Won"
              : isWin === "Draw"
              ? "Draw!"
              : ""}
          </h1>
          <h2 className="memory-game-h2">
            Player 2's score:<br></br>
            {score.P2}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;
