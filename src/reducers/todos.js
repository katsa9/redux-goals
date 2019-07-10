import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO
} from '../actions/todos'

export default function todos(state = [],
  action) { //this is called a reducer - reduces the current state and the action to the new state
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map((todo) => todo.id !== action.id ? todo :
        Object.assign({}, todo, {
          complete: !todo.complete     //updates property on object in array
        }));
    case RECEIVE_DATA:
      return action.todos    
    default:
      return state;
  }
}