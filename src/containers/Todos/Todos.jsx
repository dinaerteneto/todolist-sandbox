import React from "react";
import TodoItem from '../../components/TodoItem';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

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
      />  
    )
});
  
const SortableList = SortableContainer(({children}) => {
    return <div>{children}</div>
});

const Todo = ({onSortEnd, todos, checkTodo, delTodo, openInput, todoItem, closeInput}) => {
    return (
    <SortableList onSortEnd={onSortEnd} pressDelay={100}>
        {todos.map((todo, index) => (
            <SortableItem 
                index={index} 
                key={todo.id}
                todo={todo} 
                checkTodo={checkTodo} 
                delTodo={delTodo} 
                openInput={openInput}
                closeInput={closeInput}
                todoItem={todoItem}
            />
        ))}
    </SortableList>   
    );
}

export default Todo;
