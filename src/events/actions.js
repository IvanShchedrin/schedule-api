import * as check from './checks';
import { clearFields } from '../utils';

export const ADD_EVENT = 'add new event';
export const REMOVE_EVENT = 'remove event by id';
export const UPDATE_EVENT = 'update event by id';
export const REMOVE_SCHOOL_FROM_EVENTS = 'remove school by id from events';
export const IMPORT_EVENTS = 'import events';

export function addEvent(payload) {
  return (dispatch, getState) => {
    const clearedData = clearFields('events', payload);
    const errors = check.newEvent(getState(), clearedData);

    return dispatch(errors ?
      { type: 'error', errors } :
      { type: ADD_EVENT, payload: clearedData });
  };
}

export function updateEvent(payload) {
  return (dispatch, getState) => {
    const clearedData = clearFields('events', payload);
    const errors = check.updateEvent(getState(), clearedData);

    return dispatch(errors ?
      { type: 'error', errors } :
      { type: UPDATE_EVENT, payload: clearedData });
  };
}

export function removeEvent(payload) {
  return (dispatch, getState) => {
    const errors = check.removeEvent(getState(), payload);

    return dispatch(errors ?
      { type: 'error', errors } :
      { type: REMOVE_EVENT, id: payload.id });
  };
}

export function importEvents(payload) {
  return (dispatch, getState) => dispatch({ type: IMPORT_EVENTS, payload });
}