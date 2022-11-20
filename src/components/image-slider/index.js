import React, { useState } from "react";

import "./index.css"
import img1 from "./images/nasa1.jpg"
import img2 from "./images/nasa2.png"
import img3 from "./images/nasa3.jpg"
import img4 from "./images/nasa4.jpg"
import img5 from "./images/nasa5.jpg"

const slides = [img1, img2, img3, img4, img5];

const ImageSlider = () => {
    const [images, setImages] = useState([...slides]);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div>
            <div className="image-slider">
                <img className="image-slider-img" src={slides[activeIndex]}>
                </img>
                <div className="image-slider-button-container">
                    <button className="image-slider-slide-button"
                        onClick={() => {
                            if (activeIndex > 0)
                                setActiveIndex((currState) => currState - 1);
                            else
                                setActiveIndex(images.length - 1);
                            console.log(activeIndex)
                        }}>←</button>
                    <button className="image-slider-slide-button"
                        onClick={() => {
                            if (activeIndex < images.length - 1)
                                setActiveIndex((currState) => currState + 1);
                            else
                                setActiveIndex(0);
                            console.log(activeIndex)
                        }}>→</button>
                </div>
                <div className="image-slider-circle-button-container">

                    {images.map((img, idx) => {
                        return (
                            <button className= {activeIndex == idx ? "image-slider-circle-button" : "image-slider-circle-button-default"}
                                key={idx}
                                onClick={() => {
                                    setActiveIndex(idx);
                                }} ></button>
                        )
                    })}
                </div>
            </div>
        </div>
    )

}
export default ImageSlider;