import React from "react";
import { useState } from "react";

const ColorPicker = () => {
    const [color, setColor] = useState({ firstColor: "#ffafbd", secondColor: "#ffc3a0" });
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: '50%', height: "500px", backgroundImage: `linear-gradient(to bottom, ${color.firstColor}, ${color.secondColor})` }}>
            </div>
            <div>
                <label style={{ margin: "20px" }}>First Color:
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
                <label style={{ margin: "20px" }}>Second Color:
                    <input style={{ width: '100px', margin: "10px" }}
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
            </div>
        </div>
    )
}
export default ColorPicker;