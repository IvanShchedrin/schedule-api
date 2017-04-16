import * as check from './checks';
import { clearFields } from '../utils';

export const ADD_ROOM = 'add new room';
export const UPDATE_ROOM = 'update room by id';
export const REMOVE_ROOM = 'remove room by id';
export const IMPORT_ROOMS = 'import rooms';

export function addRoom(payload) {
  return (dispatch, getState) => {
    const clearedData = clearFields('rooms', payload);
    const errors = check.newRoom(getState(), clearedData);

    return dispatch(errors ?
      { type: 'error', errors } :
      { type: ADD_ROOM, payload: clearedData });
  };
}

export function updateRoom(payload) {
  return (dispatch, getState) => {
    const clearedData = clearFields('rooms', payload);
    const errors = check.updateRoom(getState(), clearedData);

    return dispatch(errors ?
      { type: 'error', errors } :
      { type: UPDATE_ROOM, payload: clearedData });
  }
}

export function removeRoom(payload) {
  return (dispatch, getState) => {
    const errors = check.removeRoom(getState(), payload);

    return dispatch(errors ?
      { type: 'error', errors } :
      { type: REMOVE_ROOM, payload });
  };
}

export function importRooms(payload) {
  return (dispatch, getState) => dispatch({ type: IMPORT_ROOMS, payload });
}