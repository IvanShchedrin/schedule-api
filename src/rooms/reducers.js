import uuid from 'uuid/v1';
import { ADD_ROOM, UPDATE_ROOM, REMOVE_ROOM, IMPORT_ROOMS } from './actions';

export default function(state = [], action) {
  switch (action.type) {
    case ADD_ROOM:
      return [...state, { ...action.payload, id: uuid() }];
    case UPDATE_ROOM:
      return state.map(item => item.id === action.payload.id ? { ...item, ...action.payload } : item);
    case REMOVE_ROOM:
      state.splice(state.findIndex(item => item.id === action.payload.id), 1);
      return [...state];
    case IMPORT_ROOMS:
      return action.payload;
    default:
      return state;
  }
}