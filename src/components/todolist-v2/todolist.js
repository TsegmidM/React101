import React, { useState, useEffect } from "react";
import "./todolist.css";
import { FaEdit, FaRegCheckCircle, FaRegSave, FaSearch } from "react-icons/fa";
import { MdCancel, MdDelete, MdSend } from "react-icons/md";

export default function ToDoListV3() {
  // create a state that saves the todo items
  //const [todoList, setTodoList] = useState({ original: [], filtered: [] });

  const [todoList, setTodoList] = useState(
    localStorage.getItem("list")
      ? JSON.parse(localStorage.getItem("list"))
      : { original: [], filtered: [] }
  );

  // create a state that saves the value of the input field
  const [inputField, setInputField] = useState("");

  // create a state that saves if it's a new todo or edit
  const [editItemIdx, setEditItemIdx] = useState(-1);

  //adding a search state
  const [searchInput, setSearchInput] = useState("");

  //checking if completed or not
  const [checkTodoStatus, setCheckTodoStatus] = useState(-1);

  //add to localStorage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(todoList));
  }, [todoList]);

  // useEffect(()=>{

  //   if(checkTodoStatus===-1)
  //   showAllTodos();
  //   else if(checkTodoStatus===0)
  //   showInCompleteTodos();
  //   else
  //   showCompletedTodos();

  // },
  // [checkTodoStatus])

  // create a function that changes the "isCompleted" status
  const isCompleted = (todoId) => {
    setTodoList((currState) => {
      return {
        ...currState,
        original: currState.original.map((currTodo, currTodoIdx) => {
          return currTodo.todoId === todoId
            ? {
              ...currTodo,
              isCompleted: !currTodo.isCompleted,
            }
            : currTodo;
        }),
        filtered: checkTodoStatus !== -1 ? currState.filtered.filter(
          (currTodo) => currTodo.todoId !== todoId
        )
          : currState.original.map((currTodo, currTodoIdx) => {
            return currTodo.todoId === todoId
              ? {
                ...currTodo,
                isCompleted: !currTodo.isCompleted,
              }
              : currTodo;
          })
      };
    });
    console.log("isCompleted function called");
    console.log(todoList);
  };

  //function that will who all todos
  const showAllTodos = () => {
    setTodoList((currState) => ({
      ...currState,
      filtered: currState.original,
    }));
  };
  //function that will filter incomplete todos
  const showInCompleteTodos = () => {
    setTodoList((currState) => ({
      ...currState,
      filtered: currState.original.filter((v) => !v.isCompleted),
    }));
  };
  //function that will filter completed todos
  const showCompletedTodos = () => {
    setTodoList((currState) => ({
      ...currState,
      filtered: currState.original.filter((v) => v.isCompleted),
    }));
  };

  // create a function that deletes the item from the list (i.e. update the todo items state)
  const deleteItem = (todoId) => {
    setTodoList((currState) => ({
      ...currState,
      original: currState.original.filter((v) => v.todoId !== todoId),
      filtered: currState.filtered.filter((v) => v.todoId !== todoId),
    }));
    console.log("delete function called");
    console.log(todoList);
  };
  // create an edit function - better to do it at the end
  const editItem = (todoId) => {
    // setInputField(todoList.original[todoIdx].toDo);
    let temp = todoList.original.filter((v) => v.todoId === todoId);
    setInputField(temp[0].toDo);
    //setInputField(todoList.original[todoIdx].toDo);

    setEditItemIdx(todoId);
    // deleteItem(todoIdx);
    console.log("edit function called");
  };
  const onSearchInput = (e) => {
    setSearchInput(e.target.value);

    setTodoList((currState) => ({
      ...currState,
      filtered: currState.original.filter((v) =>
        checkTodoStatus === 1 ? v.isCompleted && v.toDo.includes(e.target.value) :
          checkTodoStatus === 0 ? !v.isCompleted && v.toDo.includes(e.target.value) :
            v.toDo.includes(e.target.value)
      ),
    }));
    console.log(todoList);
  };
  const onInputChange = (e) => {
    setInputField(e.target.value);
  };

  // create a submit function, that takes the input field value and add it to the todo items state
  const onListSubmit = (e) => {
    e.preventDefault();

    if (inputField.length === 0 || !inputField.trim().length) {
      alert("Put chore first");
      return;
    } else {
      if (editItemIdx !== -1) {
        setTodoList((currState) => {
          return {
            ...currState,
            original: currState.original.map((todo, todoIdx) => {
              return editItemIdx === todo.todoId
                ? { ...todo, toDo: inputField.trim() }
                : todo;
            }),
            filtered: currState.original.map((todo, todoIdx) => {
              return editItemIdx === todo.todoId
                ? { ...todo, toDo: inputField.trim() }
                : todo;
            }),
          };
        });
        setEditItemIdx(-1);
      } else {
        setTodoList((currState) => {
          const newTodo = {
            todoId: currState.original.length + 1,
            toDo: inputField.trim(),
            author: "Ziggy",
            time: new Date().toString().slice(0, 25),
            isCompleted: false,
          }
          return ({
            ...currState,
            original: [
              ...currState.original,
              newTodo,
            ]
          },
          {
            ...currState,
            filtered: [
              ...currState.original,
              newTodo,
            ]
          }
          )
        }
          //  ({
          //   ...currState,
          //   original: [
          //     ...currState.original,
          //     {
          //       todoId: currState.original.length + 1,
          //       toDo: inputField.trim(),
          //       author: "Ziggy",
          //       time: new Date().toString().slice(0, 25),
          //       isCompleted: false,
          //     },
          //   ],
          //   filtered: [
          //     ...currState.original,
          //     {
          //       todoId: currState.original.length + 1,
          //       toDo: inputField.trim(),
          //       author: "Ziggy",
          //       time: new Date().toString().slice(0, 25),
          //       isCompleted: false,
          //     },
          //   ],
          // })
        );
      }
    }
    setInputField({});
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
              // todoList.map((todo, todoIdx) => { });
            }}
          >
            {editItemIdx !== -1 ? <FaRegSave /> : <MdSend />}
          </button>
        </form>
      </div>
      {/** list of to do items container */}
      <div className="todo-bottom">
        <h3>TheTodos:</h3>
        {/* <button onClick={saveToLocalStorage}>Save to localStorage</button> */}
        {/* <button onClick={readFromLocalStorage}>Read from localStorage</button> */}
        {/* <br /> */}
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
        <div className="check-todo-buttons">
          <button
            className={
              checkTodoStatus === -1 ? "active-todos" : "nonactive-todos"
            }
            onClick={() => {
              showAllTodos();
              setCheckTodoStatus(-1);
            }}
          >
            All
          </button>
          <button
            className={
              checkTodoStatus === 0 ? "active-todos" : "nonactive-todos"
            }
            onClick={() => {
              showInCompleteTodos();
              setCheckTodoStatus(0);
            }}
          >
            Incomplete
          </button>
          <button
            className={
              checkTodoStatus === 1 ? "active-todos" : "nonactive-todos"
            }
            onClick={() => {
              showCompletedTodos();
              setCheckTodoStatus(1);
            }}
          >
            Completed
          </button>
        </div>
        {/** todo items rendering */}

        {todoList.filtered.map((todo, todoIdx) => {
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
              {editItemIdx !== todo.todoId ? (
                <div className="todo-list-button">
                  <button
                    className={
                      todo.isCompleted ? "todo-buttons" : "notcompleted"
                    }
                    onClick={() => isCompleted(todo.todoId)}
                  >
                    <FaRegCheckCircle />
                  </button>
                  <button
                    className="todo-buttons"
                    onClick={() => editItem(todo.todoId)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="todo-buttons"
                    onClick={() => deleteItem(todo.todoId)}
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