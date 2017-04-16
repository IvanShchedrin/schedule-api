import uuid from 'uuid/v1';
import { ADD_SCHOOL, UPDATE_SCHOOL, REMOVE_SCHOOL, IMPORT_SCHOOLS } from './actions';

export default function(state = [], action) {
  switch (action.type) {
    case ADD_SCHOOL:
      return [...state, { ...action.payload, id: uuid() }];
    case UPDATE_SCHOOL:
      return state.map(item => item.id === action.payload.id ? { ...item, ...action.payload } : item);
    case REMOVE_SCHOOL:
      state.splice(state.findIndex(item => item.id === action.payload.id), 1);
      return [...state];
    case IMPORT_SCHOOLS:
      return action.payload;
    default:
      return state;
  }
}