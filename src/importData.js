import { isArray, clearFields, formatDateString } from './utils';

import { newRoom as checkNewRoom } from './rooms/checks';
import { newSchool as checkNewSchool } from './schools/checks';
import { newEvent as checkNewEvent } from './events/checks';

import { importSchools } from './schools/actions';
import { importRooms } from './rooms/actions';
import { importEvents } from './events/actions';

// Функция импорта данных из JSON.
export default function(payload) {
  let data;

  try {
    data = JSON.parse(payload);
  } catch(error) {
    return Promise.reject('cant parse provided string to JSON');
  }

  return createState(data)
    .then((payload) => {
      this._store.dispatch(importSchools(payload.schools));
      this._store.dispatch(importRooms(payload.rooms));
      this._store.dispatch(importEvents(payload.events));
    });
}

// Функция создания стейта из JSON. Если проверки пройдеты, возвращает resolved-промис с коллекцией
function createState(payload) {
  const { events, schools, rooms } = payload;
  const state = { events: [], schools: [], rooms: [] };
  let badIndex = -1;

  if (!isArray(events) || !isArray(schools) || !isArray(rooms)) {
    return Promise.reject(`data must have all required entities: ${Object.keys(state).join(', ')}`);
  }

  badIndex = rooms.findIndex((room) => {
    const clearedRoom = clearFields('rooms', room || {});

    if (checkNewRoom(state, clearedRoom) === false) {
      state.rooms.push(clearedRoom);
    } else {
      return true;
    }
  });

  if (badIndex !== -1) return Promise.reject('invalid room provided');

  badIndex = schools.findIndex((school) => {
    const clearedSchool = clearFields('schools', school || {});

    if (checkNewSchool(state, clearedSchool) === false) {
      state.schools.push(clearedSchool);
    } else {
      return true;
    }
  });

  if (badIndex !== -1) return Promise.reject('invalid school provided');

  badIndex = events.findIndex((event) => {
    const clearedEvent = clearFields('events', event || {});

    clearedEvent.dateStart = formatDateString(clearedEvent.dateStart);
    clearedEvent.dateEnd = formatDateString(clearedEvent.dateEnd);

    if (checkNewEvent(state, clearedEvent) === false) {
      state.events.push(clearedEvent);
    } else {
      return true;
    }
  });

  if (badIndex !== -1) return Promise.reject('invalid event provided');

  return Promise.resolve(state);
}