export default class TodoActions {

    static getAll() {
        console.log('TODO ACTIONS - GETALL')
        return dispatch => {
            const todos = [
                {id: 1, name: 'task 1', order: 1, done: false},
                {id: 2, name: 'task 2', order: 2, done: false},
                {id: 3, name: 'task 3', order: 3, done: true},
                {id: 4, name: 'task 4', order: 4, done: false},
                {id: 5, name: 'task 5', order: 5, done: false},
                {id: 6, name: 'task 6', order: 6, done: false},
            ];
            dispatch({type: 'TODO_GETALL', todos});
            return todos;
        }
    } 

}