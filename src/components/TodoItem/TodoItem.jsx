import React from "react";
import { Checkbox, Button, Icon } from 'semantic-ui-react'

const TodoList = ({ todo, checkTodo, delTodo }) => {
  return (
    <div>
      <Checkbox        
        label={todo.name}
        checked={todo.done}
        onChange={checkTodo(todo.id)}
      />
      <Button icon onClick={delTodo(todo.id)}>
        <Icon name='trash' />
      </Button>
    </div>
  );
};

export default TodoList;