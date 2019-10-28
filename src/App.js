import React, { Component } from "react";

import TodoForm from "./components/TodoForm";
import Todos from "./containers/Todos";
import arrayMove from 'array-move';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  /*
  componentDidMount() {
    this.setState({ todos: [...todos] })
  }

  componentDidUpdate() {
    console.log('componentDidUpdate')
  }
  */

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({todos}) => ({
      todos: arrayMove(todos, oldIndex, newIndex),
    }))

  }

  addTodo = value => {
    const { todos } = this.state; 
    this.setState({
      todos: [...todos, {
        id: Date.now(),
        name: value,
        done: false,
        order: 0
      }]
    });
  }

  checkTodo = id => () => {
    const { todos } = this.state;
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    this.setState({ todos: newTodos });
  }  

  delTodo = id => () => {
    const { todos } = this.state;
    const filterTodos = todos.filter(todo => todo.id !== id);
    this.setState({ todos: [...filterTodos]});
  }

  render() {
    const {todos} = this.state;
    return (
      <div className="App">
        
       
        <TodoForm addTodo={this.addTodo} />

        <Todos 
          onSortEnd={this.onSortEnd} 
          todos={todos} 
          checkTodo={this.checkTodo} 
          delTodo={this.delTodo} 
        />

      </div>
      
    );
  }
}

export default App;
