import React, { useState } from "react";
import "./tictactoe.css";

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function TicTacToe2() {
  const [boardData, setBoardData] = useState({});
  const [currSymbol, setCurrSymbol] = useState("X");
  const [winner, setWinner] = useState(false);
  const [draw, setDraw] = useState(false);
  let status;

  const checkWinner = (cellIdx) => {
    console.log(boardData, Object.keys(boardData).length);
    if (Object.keys(boardData).length + 1 >= 5) {
      let winOptions = winningLines.filter((value) => {
        if (value.includes(cellIdx)) return true;
        else return false;
      });

      winOptions.forEach((winOption) => {
        const isWin = winOption.every((winLocation) => {
          if (winLocation === cellIdx) return true;

          return boardData[winLocation] === currSymbol;
        });

        if (isWin === true) {
          setWinner(true);
        } else if (Object.keys(boardData).length === 8 && !winner) {
          setDraw(true);
        }
      });
    }

    setBoardData((currState) => {
      return { ...currState, [cellIdx]: currSymbol };
    });
    setCurrSymbol((currState) => (currState === "X" ? "O" : "X"));
  };

  status = draw
    ? "Draw!"
    : winner
    ? `Winner is: ${currSymbol === "X" ? "O" : "X"}`
    : `${currSymbol}'s turn`;

  return (
    <div className="ttt-container">
      <div className="ttt-status">{status}</div>
      <div className="ttt-board">
        {[...Array(9)].map((cell, cellIdx) => {
          return (
            <div
              className="ttt-cell"
              key={cellIdx}
              onClick={() => {
                if (winner || boardData[cellIdx]) return;
                checkWinner(cellIdx);
              }}
            >
              {boardData[cellIdx]}
            </div>
          );
        })}
      </div>
      <button
        className="ttt-button"
        onClick={() => {
          setBoardData({});
          setWinner(false);
          setCurrSymbol("X");
        }}
      >
        Reset
      </button>
    </div>
  );
}
