export function todos(state = [], action) {

    

    switch(action.type) 
    {
        case "TODO_GETALL":
            return action.todos;
            break;

        case "TODO_ADD":
            state.push(action.todo);
            return state;
            break;

        case "TODO_UPDATE":
            const i = state.findIndex(task => task.id === action.todo.id);
            state[i]['name'] = action.todo.name;
            return state;
            break;

        case "TODO_DELETE":
            const filterTodos = state.filter(todo => todo.id !== action.id);
            state =  [...filterTodos];   
            return state;         
            break;

        case "TODO_DONE":
            const index = state.findIndex(task => task.id === action.id);
            state[index].done = !state[index].done;
            return [...state];
            break;

        default:
            return state;

    }

}