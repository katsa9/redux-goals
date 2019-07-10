import API from 'goals-todos-api'

export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'

function addTodo (todo) {
  return {
    type: ADD_TODO,
    todo,
  }
}

function removeTodo (id) {
  return {
    type: REMOVE_TODO,
    id,
  }
}

function toggleTodo (id) {
  return {
    type: TOGGLE_TODO,
    id,
  }
}

export function handleAddTodo(name, callback) {
  return (dispatch) => {
    return API.saveTodo(name)
      .then((todo) => {
        dispatch(addTodo(todo))
        callback()
      })
      .catch(() => {
        alert('There was an error. Try again.')
      })
  }
}

export function handleDeleteTodo(todo) {
  return (dispatch) => {
    dispatch(removeTodo(todo.id))
    return API.deleteTodo(todo.id)
      .catch(() => {
        dispatch(addTodo(todo))
        alert("There was an error. Try again")
      })
  }
}

export function handleToggleTodo(id) {
  return (dispatch) => {
    dispatch(toggleTodo(id)) //optimistic updating of ui
    return API.saveTodoToggle()
      .catch(() => {
        dispatch(toggleTodo(id)) //resets value to original if there was an error
        alert("There was an error. Try again")
      })
  }
}