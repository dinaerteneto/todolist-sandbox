import React, {Component} from "react";
import { Button, List, Checkbox, Grid, Icon, Input, Popup } from 'semantic-ui-react'

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

  updItem = (id, name) => {
    this.props.closeInput();
    this.props.updTodo(id, name)
    this.setState({ todoItem: {updateItem: false, key: null} });
  }

  handleBlur = (id, event) => {
    const name = event.target.value;
    this.updItem(id, name);
  }

  handleKeyUp = (id, event) => {
    if(event.keyCode === 13) {
      const name = event.target.value;
      this.updItem(id, name);
    }
  }

  render() {
    const { todo, checkTodo, delTodo } = this.props;
    const { todoItem } = this.state;
    let itemA;

    itemA = <Checkbox 
      label={todo.name} 
      checked={todo.done} 
      onChange={checkTodo(todo.id)}
    />
    if(todoItem.updateItem === true) {
      itemA = <Input 
        key={todo.key} 
        defaultValue={todo.name} 
        onBlur={event => this.handleBlur(todo.id, event)}
        onKeyUp={event => this.handleKeyUp(todo.id, event)} 
        autoFocus 
      />
    }

    return (
      <List.Item>
        <List.Content>
        <Grid
            centered
            columns={2}
            padded
            stackable
            textAlign='center'
          >

            <Grid.Column>
              <p>{itemA}</p>
            </Grid.Column>
  
            <Grid.Column>
            <Popup content='Alterar tarefa' trigger={<Button icon
                size='mini'
                color='yellow'
                onClick={this.openInput(todo.id)} 
                disabled={this.state.todoItem.updateItem}>
                <Icon name='edit' />
              </Button>} />

              <Popup content='Remover tarefa' trigger={<Button icon
                size='mini'
                color='red'
                onClick={delTodo(todo.id)} 
                disabled={this.state.todoItem.updateItem}>
                <Icon name='trash alternate' />
              </Button>} />
            </Grid.Column>

          </Grid>
          </List.Content>
          </List.Item>
    )
  }
}


export default TodoItem;
