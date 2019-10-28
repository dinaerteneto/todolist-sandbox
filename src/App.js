import React, { Component } from "react";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { TaskService } from "./services/TaskService";
import { Task } from "./models/Task";

import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

const SortableItem = SortableElement((value) => {
  const {todo} = value;
  
  return (
    <TodoList 
    index={`index-${todo.id}`}
    key={todo.id}
    todo={todo} 
    checkTodo={value.checkTodo} 
    delTodo={value.delTodo} 
  />  
  )
});

const SortableList = SortableContainer(({children}) => {
  return <div>{children}</div>
});


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
          this.setState({ todos: [...todos] })
        } 
      )
      .catch(erro => console.log(erro))
  }

  componentDidUpdate() {
    console.log('componentDidUpdate')
    
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    console.log(oldIndex, newIndex)
    this.setState(({todos}) => ({
      todos: arrayMove(todos, oldIndex, newIndex),
    }))

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

    console.log('checktodo', id)

    const { todos } = this.state;     
    const newTodo = todos.map(todo =>  {
      return todo.id === id ? new Task(todo.id, !todo.done, todo.name) : todo
    });
    let todo = todos.find(todo => todo.id === id);
    todo = {...todo, _done: !todo.done}
    
    this._taskService
      .update(todo)
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

        <SortableList onSortEnd={this.onSortEnd}>
        {todos.map((todo, index) => (
          <SortableItem 
            index={index} 
            key={todo.id}
            todo={todo} 
            checkTodo={this.checkTodo} 
            delTodo={this.delTodo} 
          />
        ))}
        </SortableList>

      </div>
      
    );
  }
}

export default App;
