//todos reducer

export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';

export const todos = (state = [], {type, payload}) => {
  switch(type){
    case ADD_TODO:
      return state.concat([Object.assign({}, payload, {id: state.length + 1})]);
    case UPDATE_TODO:
      return state.map(todo => {
        return todo.id !== payload.id ?
          todo :
          Object.assign({}, todo, payload)
      });
    case COMPLETE_TODO:
      return state.map(todo => {
        return todo.id !== payload.id ?
          todo :
          Object.assign({}, todo, {completed: true})
      });
    case DELETE_TODO:
      return state.filter(todo => todo.id !== payload.id);
    default:
      return state;
  }
}

export const ALL = 'ALL'
export const COMPLETE = 'COMPLETE'
export const PENDING = 'PENDING'

export const visibilityFilter = (state = (todo) => true, {type, payload}) => {
  switch(type){
    case ALL:
      return (todo) => true;
    case COMPLETE:
      return (todo) => todo.completed;
    case PENDING:
      return (todo) => !todo.completed;
    default:
      return state;
  }
}
