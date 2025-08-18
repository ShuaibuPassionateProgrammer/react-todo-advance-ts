import React, { useState } from "react";
import "./styles.css";

const generateID = () => {
  return Math.floor(Math.random() * 10);
};

const ToDo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    setTodos((todos) => todos.concat({ id: generateID(), text: input }));
    setInput("");
  };

  const removeTodo = (id) => setTodos((todo) => todo.filter((t) => t.id !== id));

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Type Something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleSubmit}>Add TODO</button>

      <ul className="todos-list">
        {todos.map(({ id, text }) => {
          return (
            <li key={id} className="todo">
              <span>{text}</span>
              <button className="close" onClick={() => removeTodo(id)}>
                X
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ToDo;