import React, { useState } from "react";
import './tictactoe.css'

const TicTacToe = () => {
    let draw = null, status, winner = null;
    const [boardSquares, setBoardSquares] = useState(Array(9).fill(null))
    const [isXTrue, setIsXTrue] = useState(true);
    const winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < winningLines.length; i++) {
        const [a, b, c] = winningLines[i];
        if (boardSquares[a] && boardSquares[a] === boardSquares[b] && boardSquares[b] === boardSquares[c])
            winner = boardSquares[c];
    }

    if (boardSquares.every((square) => square !== null) && !winner) {
        draw = true;
    }
    status = draw ? "Draw!" : winner ? `Winner is: ${winner}` : `${isXTrue ? "X" : "O"}'s turn`

    return (
        <div className="ttt-container">
            <div className="status">{status}</div>
            <div className="board">
                {boardSquares.map((cell, nIdx) => {
                    return (
                        <div className="cell" key={nIdx} onClick={() => {
                            if (winner || boardSquares[nIdx]) return;
                            boardSquares[nIdx] = isXTrue ? "X" : "O";
                            setBoardSquares(boardSquares);
                            setIsXTrue(!isXTrue);
                        }
                        }
                        > {cell}</div>
                    )
                })}
            </div>
            <button className="ttt-button" onClick={() => {
                setBoardSquares(Array(9).fill(null));
                setIsXTrue('X');
            }}>Reset</button>
        </div>
    )
}
export default TicTacToe;
