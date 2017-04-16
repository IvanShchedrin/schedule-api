import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { loadState, saveState, resolveResult } from './utils';
import * as queries from './queries';
import importData from './importData';

import rooms from './rooms/reducers';
import schools from './schools/reducers';
import events from './events/reducers';

import * as roomsActions from './rooms/actions';
import * as schoolsActions from './schools/actions';
import * as eventsActions from './events/actions';

const scheduleApi = combineReducers({
  rooms,
  schools,
  events,
});

export default class Schedule {
  constructor() {
    this.store = createStore(
      scheduleApi,
      loadState(),
      applyMiddleware(thunk),
    );
    this.store.subscribe(() => saveState(this.store.getState()));
  }

  getState = () => this.store.getState();
  subscribe = (cb) => this.store.subscribe(cb);

  getEventsBySchoolAndDates = (schoolId, dateStart, dateEnd) => {
    return queries.getEventsBySchoolAndDates(this.store.getState(), { schoolId, dateStart, dateEnd });
  };

  getEventsByRoomAndDates = (roomId, dateStart, dateEnd) => {
    return queries.getEventsByRoomAndDates(this.store.getState(), { roomId, dateStart, dateEnd });
  };

  exportData = () => JSON.stringify(this.store.getState());

  importData = payload => importData.call(this, payload);

  addRoom = payload => resolveResult( this.store.dispatch(roomsActions.addRoom(payload)) );
  addSchool = payload => resolveResult( this.store.dispatch(schoolsActions.addSchool(payload)) );
  addEvent = payload => resolveResult( this.store.dispatch(eventsActions.addEvent(payload)) );

  updateRoom = payload => resolveResult( this.store.dispatch(roomsActions.updateRoom(payload)) );
  updateSchool = payload => resolveResult( this.store.dispatch(schoolsActions.updateSchool(payload)) );
  updateEvent = payload => resolveResult( this.store.dispatch(eventsActions.updateEvent(payload)) );

  removeRoom = payload => resolveResult( this.store.dispatch(roomsActions.removeRoom(payload)) );
  removeSchool = payload => resolveResult( this.store.dispatch(schoolsActions.removeSchool(payload)) );
  removeEvent = payload => resolveResult( this.store.dispatch(eventsActions.removeEvent(payload)) );
}