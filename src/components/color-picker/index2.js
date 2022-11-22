import React from "react";
import { useState } from "react";

const ColorPicker2 = () => {
    const [boxColor, setBoxColor] = useState({ firstColor: "#ffafbd", secondColor: "#ffc3a0" });
    
    const [color, setColor] = useState({ firstColor: "#ffafbd", secondColor: "#ffc3a0" });

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: '90%', height: "500px", backgroundImage: `linear-gradient(to bottom, ${boxColor.firstColor}, ${boxColor.secondColor})` }}>
            </div>
            <form onSubmit={(e)=>e.preventDefault()} style={{ width: '500px', display: "flex", alignItems: "center", justifyContent:"space-evenly" }}>
                <label>First Color:
                    <input style={{ width: '100px', margin: "10px" }}
                        type="color"
                        value={color.firstColor}
                        onChange={(e) => {
                            setColor((currState) => {
                                return {
                                    ...currState,
                                    firstColor: e.target.value,
                                }
                            })
                        }} />
                </label>
                <label>Second Color:
                    <input style={{ width: '100px',margin: "10px" }}
                        type="color"
                        value={color.secondColor}
                        onChange={(e) => {
                            setColor((currState) => {
                                return {
                                    ...currState,
                                    secondColor: e.target.value,
                                }
                            })
                        }} />
                </label>
                <button type="submit" onClick={() => { 
                    setBoxColor((currState)=>{
                        return{
                            ...currState,
                            firstColor:color.firstColor,
                            secondColor:color.secondColor
                        }
                    })
                }}>
                    Apply
                </button>
                </form>
        </div>
    )
}
export default ColorPicker2;