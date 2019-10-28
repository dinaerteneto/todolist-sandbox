import React from "react";
import { Checkbox, Button, Icon, Grid } from 'semantic-ui-react'

const TodoList = ({ todo, checkTodo, delTodo }) => {
  return (
    <div>
      <Grid
          centered
          columns={2}
          padded
          stackable
          textAlign='center'
        >

        <Grid.Column>
          <Checkbox      
            label={todo.name}
            checked={todo.done}
            onChange={checkTodo(todo.id)}          
          />
          </Grid.Column>

          <Grid.Column>
            <Button onClick={delTodo(todo.id)} width={2}>
              <Icon name='trash' />
            </Button>
          </Grid.Column>

        </Grid>
    </div>
  );
};

export default TodoList;
