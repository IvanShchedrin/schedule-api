import uuid from 'uuid/v1';
import { ADD_EVENT, REMOVE_EVENT, UPDATE_EVENT, REMOVE_SCHOOL_FROM_EVENTS, IMPORT_EVENTS } from './actions';
import { IMPORT_DATA } from '../importData';

export default function(state = [], action) {
  switch (action.type) {
    case ADD_EVENT:
      return [...state, { ...action.payload, id: uuid() }];
    case UPDATE_EVENT:
      return state.map(item => item.id === action.payload.id ? { ...item, ...action.payload } : item);
    case REMOVE_EVENT:
      state.splice(state.findIndex(item => item.id === action.id), 1);
      return [...state];
    case REMOVE_SCHOOL_FROM_EVENTS:
      return state.map((event) => {
        const schoolIndex = event.schools.indexOf(action.payload.id);
        if (schoolIndex === -1) {
          return event;
        }
        event.schools.splice(schoolIndex, 1);
        return event;
      });
    case IMPORT_EVENTS:
      return action.payload;
    default:
      return state;
  }
}