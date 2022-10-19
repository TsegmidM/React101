import React from "react";
import TodoComponent from ".";

const todoList = ["Get Up", "Eat", "Code", "Sleep", "Repeat!"];

const TodoList = () => {
  return (
    <div>
      {todoList.map((todo, listIdx) => {
        return <TodoComponent   todo={todo} key={listIdx} />;
      })}
    </div>
  );
};
export default TodoList;
