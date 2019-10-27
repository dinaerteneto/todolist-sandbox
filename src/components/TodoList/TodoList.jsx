import React from "react";

const TodoList = ({ todos, checkTodo, delTodo }) => {
  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            value={todo.id}
            name="done[]"
            checked={todo.done}
            onChange={checkTodo(todo.id)}
          />
          {todo.name}

          <button onClick={delTodo(todo.id)} key={todo.id} id={todo.id} >X</button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
