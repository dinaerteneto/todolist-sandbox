import React, { Component } from "react";
import arrayMove from 'array-move';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react'

import About from "./pages/About";
import Header from "./components/layouts/Header";
import TodoForm from "./components/TodoForm";
import Todos from "./containers/Todos";
import FixedMenuLayout from "./components/layouts/FixedMenu";


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
      <Router>
        <div className="App">
          <div className="container">
            <FixedMenuLayout />
            <br />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <Container style={{ marginTop: '7em' }}>
                  <TodoForm addTodo={this.addTodo} />
                  <Todos 
                    onSortEnd={this.onSortEnd} 
                    todos={todos} 
                    checkTodo={this.checkTodo} 
                    delTodo={this.delTodo} 
                  />
                </Container>
              </React.Fragment>
            )} />

            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
      
    );
  }
}

export default App;
