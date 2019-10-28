import React, {Component} from "react";
import { Button, Checkbox, Grid, Icon, Input } from 'semantic-ui-react'

class TodoItem extends Component {

  constructor(props) {
      super(props);
      this.state = {
        todoItem: {
          updateItem: false,
          key: null
        }  
      }
  }

  openInput = id => () => {
    const openInput = this.props.openInput(id);
    openInput(id);
    this.setState({ todoItem: {updateItem: true, key: id} });
  }

  closeInput = id => () => {
    this.props.closeInput();
    this.setState({ todoItem: {updateItem: false, key: null} });
  }

  render() {
    const { todo, checkTodo, delTodo } = this.props;
    const { todoItem } = this.state;
    let itemA;

    itemA = <Checkbox label={todo.name} checked={todo.done} onChange={checkTodo(todo.id)} />
    if(todoItem.updateItem === true) {
      itemA = <Input key={todo.key} defaultValue={todo.name} onBlur={this.closeInput(todo.id)} autoFocus />
    }

    return (
      <div>
        <Grid
            centered
            columns={3}
            padded
            stackable
            textAlign='center'
          >
  
            <Grid.Column>
              {itemA}
            </Grid.Column>
  
            <Grid.Column>
              <Button onClick={this.openInput(todo.id)} width={2} disabled={this.props.todoItem.updateItem}>
                <Icon name='pencil' />
              </Button>

              <Button onClick={delTodo(todo.id)} width={2} disabled={this.props.todoItem.updateItem}>
                <Icon name='trash' />
              </Button>

            </Grid.Column>
  
          </Grid>
      </div>  
    )
  }
}


export default TodoItem;
