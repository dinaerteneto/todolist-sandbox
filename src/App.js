import React, { Component } from "react";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { TaskService } from "./services/TaskService";
import { Task } from "./models/Task";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
    this._taskService = new TaskService();
  }

  componentDidMount() {
    this._taskService
      .all()
      .then(
        todos => {
          console.log(todos);
          this.setState({ todos: [...todos] })
        } 
      )
      .catch(erro => console.log(erro))
  }

  addTodo = value => {
    const { todos } = this.state;
    const task = new Task(Date.now(), false, value);

    this._taskService
      .create(task)
      .then(msg => {
        this.setState({
          todos: [...todos, task]
        });
      })
      .catch(erro => console.log(erro));
  };

  checkTodo = id => () => {
    const { todos } = this.state;
    const newTodo = todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );

    this._taskService
      .update(newTodo)
      .then(msg => {
        this.setState({ todos: newTodo });
      })
      .catch(erro => console.log(erro));
  };

  delTodo = id => () => {
    const { todos } = this.state;
    const filterTodos = todos.filter(todo => todo.id !== id);
    const todo = todos.find(todo => todo.id === id);    

    this._taskService
      .delete(todo)
      .then(msg => {
        this.setState({ todos: [...filterTodos]});
      })
      .catch(erro => console.log(erro));
  }

  render() {
    const {todos} = this.state;
    return (
      <div className="App">
        <Header />
        <TodoForm addTodo={this.addTodo} />
        <TodoList 
          todos={todos} 
          checkTodo={this.checkTodo} 
          delTodo={this.delTodo} 
        />
      </div>
    );
  }
}

export default App;
