import * as check from './checks';
import { clearFields } from '../utils';
import { REMOVE_SCHOOL_FROM_EVENTS } from '../events/actions';

export const ADD_SCHOOL = 'add new school';
export const UPDATE_SCHOOL = 'update school';
export const REMOVE_SCHOOL = 'remove school by id';
export const IMPORT_SCHOOLS = 'import schools';

export function addSchool(payload) {
  return (dispatch, getState) => {
    const clearedData = clearFields('schools', payload);
    const errors = check.newSchool(getState(), clearedData);

    return dispatch(errors ?
      { type: 'error', errors } :
      { type: ADD_SCHOOL, payload: clearedData });
  };
}

export function updateSchool(payload) {
  return (dispatch, getState) => {
    const clearedData = clearFields('schools', payload);
    const errors = check.updateSchool(getState(), clearedData);

    return dispatch(errors ?
      { type: 'error', errors } :
      { type: UPDATE_SCHOOL, payload: clearedData });
  };
}

export function removeSchool(payload) {
  return (dispatch, getState) => {
    const errors = check.removeSchool(getState(), payload);

    if (errors) {
      return dispatch({ type: 'error', errors });
    }

    dispatch({ type: REMOVE_SCHOOL_FROM_EVENTS, payload });
    return dispatch({ type: REMOVE_SCHOOL, payload });
  };
}

export function importSchools(payload) {
  return (dispatch, getState) => dispatch({ type: IMPORT_SCHOOLS, payload });
}