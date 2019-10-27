import React from "react";

const TodoList = ({ todo, checkTodo, delTodo }) => {
  return (
    <div>
      <input        
        type="checkbox"
        value={todo.id}
        name="done[]"
        checked={todo.done}
        onChange={checkTodo(todo.id)}
      />
      {todo.name}
      <button onClick={delTodo(todo.id)}>X</button>
    </div>
  );
};

export default TodoList;
