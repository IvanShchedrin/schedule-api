import { isDateValid, findById, isArray, dateRangesOverlap } from '../utils';

export function newEvent(state, payload) {
  if (!payload) return ['empty event data'];

  const reasons = [];
  const { name, lecturer, dateStart, dateEnd, schools, room } = payload;
  let foundRoom;

  if (typeof name !== 'string' || name === '') {
    reasons.push('new event must have name');
  }

  if (typeof lecturer !== 'string' || name === '') {
    reasons.push('new event must have lecturer');
  }

  if (new Date(dateStart) > new Date(dateEnd)) {
    reasons.push('end date must be larger then start date');
  }

  if (typeof room === 'undefined') {
    reasons.push('new event must have room');
    return reasons;
  } else {
    foundRoom = findById(state.rooms, room);
    if (!foundRoom) {
      reasons.push('invalid room');
      return reasons;
    }
  }

  if (!isArray(schools)) {
    reasons.push('new event must have array of schools');
    return reasons;
  }

  const foundSchools = findById(state.schools, schools);

  if (schools.length > 0) {
    if (!foundSchools || foundSchools.length < schools.length) {
      reasons.push('some of schools was not found');
      return reasons;
    } else {
      let totalAmount = foundSchools.reduce((result, item) => result += item.amount, 0);
      if (totalAmount > foundRoom.seats) {
        reasons.push('not enough seats in room');
      }
    }
  }

  if (!isDateValid(dateStart)) {
    reasons.push('new event must have valid start date');
    return reasons;
  }

  if (!isDateValid(dateEnd)) {
    reasons.push('new event must have valid end date');
    return reasons;
  }

  if (new Date(dateStart) >= new Date(dateEnd)) {
    reasons.push('dateEnd must be later then dateStart');
    return reasons;
  }

  const overlapIndex = state.events.findIndex((event) => {
    const isSchoolExists = event.schools.findIndex(schoolId => schools.indexOf(schoolId) !== -1) !== -1;
    if (isSchoolExists && dateRangesOverlap(event.dateStart, event.dateEnd, dateStart, dateEnd)) {
      return true;
    }
  });

  if (overlapIndex !== -1) {
    reasons.push(`event '${state.events[overlapIndex].name}' has same time for one of provided schools`);
  }

  const conflictRoomEventIndex = state.events.findIndex((event) => {
    if (event.room === room && dateRangesOverlap(event.dateStart, event.dateEnd, dateStart, dateEnd)) {
      return true;
    }
  });

  if (conflictRoomEventIndex !== -1) {
    reasons.push(`event '${state.events[conflictRoomEventIndex].name}' already uses this room at provided time range`);
  }

  return reasons.length === 0 ? false : reasons;
}


export function updateEvent(state, payload) {
  if (!payload) return ['empty event data'];

  const eventIndex = state.events.findIndex(event => event.id === payload.id);
  if (eventIndex === -1) {
    return ['invalid id'];
  }

  const mergedPayload = {
    ...state.events[eventIndex],
    ...payload,
  };

  return newEvent({
    ...state,
    events: [
      ...state.events.slice(0, eventIndex),
      ...state.events.slice(eventIndex + 1),
    ]
  }, mergedPayload);
}


export function removeEvent(state, payload) {
  if (!payload) return ['empty event data'];

  const reasons = [];
  const { id } = payload;
  const foundEvent = findById(state.events, id);

  if (typeof foundEvent === 'undefined') {
    reasons.push('invalid id');
  }

  return reasons.length === 0 ? false : reasons;
}