import React, {useState} from "react";
import './index.css'

const tiles = [1,2,3,4,5,6,7,8]

//3state
//setTimeOut
const MemoryGame = () => {
    return(
        <div className="container">
            {
                [...tiles,...tiles].map((square,id) => {
                    return(
                        <div className="square">{square}</div>
                    )
                })
            }
        </div>
    )
}
export default MemoryGame;