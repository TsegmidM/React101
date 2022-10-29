import React, {useState} from "react";
import TicTac from "./tictac";
import './tictactoe.css'
const TicTacToe = () => {
    const squares = [1,2,3,4,5,6,7,8,9]
    const [xOrO, setXorO] = useState(0);

    return(
        <div className="container">
            {squares.map((n,nIdx) => {
                return xOrO === n ? (
                <button className="tictactoe-btn"
                onClick={() => setXorO(()=>n)}
                >
                    <TicTac choice="O"/>
                </button>
                )
                :
                <button className="tictactoe-btn"
                onClick={() => setXorO(()=>n)}
                ></button>    
            })}
        </div>
    )
}
export default TicTacToe;