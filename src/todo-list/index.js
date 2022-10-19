import React from "react";

const TodoComponent = (props) => {
    console.log(props)
    return(
        <li> {props.todo}</li>
    )
}
export default TodoComponent;