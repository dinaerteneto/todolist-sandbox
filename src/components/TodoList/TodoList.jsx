import React from "react";
import { Checkbox, Button, Icon } from 'semantic-ui-react'

const CheckboxExampleCheckbox = () => (
  <Checkbox label='Make my profile visible' />
)

const TodoList = ({ todo, checkTodo, delTodo }) => {
  return (
    <div>
      
      <Checkbox        
        label={todo.name}
        checked={todo.done}
        onChange={() => console.log('dsa dsa da')}
      />

      <Button icon onClick={delTodo(todo.id)}>
        <Icon name='trash' />
      </Button>
    </div>
  );
};

export default TodoList;
