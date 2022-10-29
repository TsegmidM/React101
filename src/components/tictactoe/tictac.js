import React from "react";

const TicTac = (props) =>{
    return (
        props.choice ==='O' ? (
        <span>O</span>
        )
        :
        <span>X</span>
    )
}
export default TicTac;