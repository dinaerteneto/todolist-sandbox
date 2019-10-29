export function todos(state = [], action) {

    switch(action.type) 
    {
        case "TODO_GETALL":
            console.log('REDUCERS - TODO_GETALL')
            console.log(action);
            return action.todos;
            break;

        case "TODO_ADD":
            break;

        case "TODO_UPDATE":
            break;

        case "TODO_DELETE":
            break;

        case "TODO_DONE":
            break;

        default:
            return state;

    }

}