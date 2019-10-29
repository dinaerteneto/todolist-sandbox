import React, {Component} from "react";
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import { List } from 'semantic-ui-react'
import arrayMove from 'array-move';

import TodoForm from '../../components/TodoForm';
import TodoItem from '../../components/TodoItem';

const SortableItem = SortableElement((value) => {
    const {todo} = value;
    return (
      <TodoItem
        index={`index-${todo.id}`}
        key={todo.id}
        todo={todo} 
        checkTodo={value.checkTodo} 
        delTodo={value.delTodo}
        openInput={value.openInput}
        closeInput={value.closeInput}
        todoItem={value.todoItem}
        updTodo={value.updTodo}
      />  
    )
});
  
const SortableList = SortableContainer(({children}) => {
    return <List celled>{children}</List>
});

class Todos extends Component {

    constructor(props) {
        super(props);
        this.state = {
          todos: [],
          todoItem: {
            updateItem: false,
            key: null
          }
        };
      }
    
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
    
      updTodo = (id, name) => {
        const { todos } = this.state;
        const newTodos = todos.map(todo =>
          todo.id === id ? { ...todo, name } : todo
        );
        this.setState({ todos: newTodos });
      }
    
      delTodo = id => () => {
        const { todos } = this.state;
        const filterTodos = todos.filter(todo => todo.id !== id);
        this.setState({ todos: [...filterTodos]});
      }
    
      openInput = id => () => {
        this.setState({ todoItem: {updateItem: true, key: id} });
      }
    
      closeInput = () => {
        this.setState({ todoItem: {updateItem: false, key: null} });
      }

    componentDidMount() {
        this.loadTodos();
    }

    loadTodos() {
        const {store} = this.props;
        store.dispatch({type: 'TODOS-LIST-ALL', todos: []});
    }

    render() {
        
        return (
            <div>
                <TodoForm 
                addTodo={this.addTodo} 
                todoItem={this.state.todoItem}
                store={this.props.store}
                />

            <SortableList onSortEnd={this.onSortEnd} pressDelay={100}>
                {this.state.todos.map((todo, index) => (
                    <SortableItem 
                        index={index} 
                        key={todo.id}
                        todo={todo} 
                        checkTodo={this.checkTodo} 
                        delTodo={this.delTodo} 
                        openInput={this.openInput}
                        closeInput={this.closeInput}
                        todoItem={this.todoItem}
                        updTodo={this.updTodo}
                        store={this.props.store}
                    />
                ))}
            </SortableList>   
        </div>
        );
    }
}

export default Todos;
