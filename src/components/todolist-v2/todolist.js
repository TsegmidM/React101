import React, { useState } from "react";
import "./index.css";
import { FaEdit, FaRegCheckCircle, FaRegSave, FaSearch } from "react-icons/fa";
import { MdCancel, MdDelete, MdSend } from "react-icons/md";

export default function ToDoListV3() {
  // create a state that saves the todo items
  const [todoList, setTodoList] = useState([]);

  // create a state that saves the value of the input field
  const [inputField, setInputField] = useState("");

  // create a state that saves if it's a new todo or edit
  const [editItemIdx, setEditItemIdx] = useState(-1);

  //adding a search state
  const [searchInput, setSearchInput] = useState("");

  //adding state that will who todos if its complete or imcomplete
  const [isIncomplete, setIsIncomplete] = useState(0);

  // create a function that changes the "isCompleted" status
  const isCompleted = (todoIdx) => {
    setTodoList((currState) => {
      return currState.map((currTodo, currTodoIdx) => {
        return currTodoIdx === todoIdx
          ? {
              ...currTodo,
              isCompleted: !currTodo.isCompleted,
            }
          : currTodo;
      });
    });
    console.log("isCompleted function called");
    console.log(todoList);
  };
  // create a function that deletes the item from the list (i.e. update the todo items state)
  const deleteItem = (todoIdx) => {
    setTodoList((currState) => currState.filter((v, i) => i !== todoIdx));
    console.log("delete function called");
    console.log(todoList);
  };
  // create an edit function - better to do it at the end
  const editItem = (todoIdx) => {
    setInputField(todoList[todoIdx].toDo);
    setEditItemIdx(todoIdx);
    // deleteItem(todoIdx);
    console.log("edit function called");
  };
  const onSearchInput = (e) =>{
    setSearchInput(e.target.value);
    let temp = [...todoList];
     setTodoList((currState) => currState.filter((v) => (v.toDo).includes(e.target.value)));
  }
  const onInputChange = (e)=> {
    setInputField(e.target.value);
  }
  const saveToLocalStorage = () =>{
    localStorage.setItem('list',JSON.stringify(todoList))
  }
  const readFromLocalStorage = () => {
    let savedLocalStorage = localStorage.getItem('list');
    setTodoList(JSON.parse(savedLocalStorage  ))
  }
  // create a submit function, that takes the input field value and add it to the todo items state
  const onListSubmit = (e) => {
    e.preventDefault();

    if (inputField.length === 0 || !inputField.trim().length) {
      alert("Put chore first");
      return;
    } else {
      if (editItemIdx !== -1) {
        setTodoList((currState) => {
          return currState.map((todo, todoIdx) => {
            return editItemIdx === todoIdx
              ? { ...todo, toDo: inputField.trim() }
              : todo;
          });
        });
        setEditItemIdx(-1);
      } else {
        setTodoList((currState) => [
          ...currState,
          {
            toDo: inputField.trim(),
            author: "Ziggy",
            time: new Date().toString().slice(0, 25),
            isCompleted: false,
          },
        ]);
      }
    }
    setInputField("");
    console.log("Submit button clicked");
    console.log(todoList);
  };

  return (
    <div className="todo-container">
      {/* calls the submit function */}
      TO DO LIST
      <div>
        <form className="todo-top" onSubmit={onListSubmit}>
          <label className="new-input-label">
            Add chore
            <input
              placeholder="Enter to do..."
              className="new-input"
              type="text"
              value={inputField} //should read from the state
              onChange={onInputChange} // should update the state
            />
          </label>
          <button
            className="submit-button"
            type="submit"
            onClick={() => {
              todoList.map((todo, todoIdx) => {});
            }}
          >
            {editItemIdx !== -1 ? <FaRegSave /> : <MdSend />}
          </button>
        </form>
      </div>
      {/** list of to do items container */}
      <div className="todo-bottom">
        <h3>TheTodos:</h3>
        <button 
        onClick={saveToLocalStorage}>Save to localStorage</button>
        <button
        onClick={readFromLocalStorage}>Read from localStorage</button>
        <br/>
        <div className="search-section">
          <button className="search-button">
            <FaSearch />
          </button>
          <input
            className="search-input"
            type="search"
            placeholder="Search..."
            value={searchInput}
            onChange={onSearchInput} // should update the state
          ></input>
        </div>
        <div>
          <button
          onClick={() => {
            setIsIncomplete(0);
            console.log(isIncomplete);
          }}>All</button>
          <button
            onClick={() => {
              setTodoList((currState) => currState.filter((v) => !v.isCompleted));
              console.log(isIncomplete);
            }}
          >
            Incomplete
          </button >
          <button
          onClick={() => {
           // setTodoList((currState) => currState.filter((v) => !v.isCompleted));
            console.log(isIncomplete);
          }}>Complete</button>
        </div>
        {/** todo items rendering */}
        
                
         { isIncomplete===0 && todoList.map((todo, todoIdx) => { 
          return (
            <div key={todoIdx} className="todo-list">
              {/** style the todo item */}
              {/** todo item should include
               * 1. title
               * 2. date
               * 3. button 1 - calls the delete function
               * 4. button 2 - calls the function that changes the isCompleted
               * 5. button 3 - calls the edit function
               */}
              <div className="todo-list-item">
                <div className={todo.isCompleted ? "line-thru" : "todo-title"}>
                  {todo.toDo}
                </div>
                <div>Author: {todo.author}</div>
                <div>Date: {todo.time}</div>
              </div>
              {editItemIdx !== todoIdx ? (
                <div className="todo-list-button">
                  <button
                    className={
                      todo.isCompleted ? "todo-buttons" : "notcompleted"
                    }
                    onClick={() => isCompleted(todoIdx)}
                  >
                    <FaRegCheckCircle />
                  </button>
                  <button
                    className="todo-buttons"
                    onClick={() => editItem(todoIdx)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="todo-buttons"
                    onClick={() => deleteItem(todoIdx)}
                  >
                    <MdDelete />
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className="todo-cancel-button"
                    onClick={() => {
                      setEditItemIdx(-1);
                      setInputField("");
                    }}
                  >
                    <MdCancel />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
