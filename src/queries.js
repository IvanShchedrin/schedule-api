import { dateRangesOverlap, isDateValid } from './utils';

export function getEventsBySchoolAndDates(state, params) {
  const { schoolId, dateStart, dateEnd } = params;

  return (!schoolId || new Date(dateStart) > new Date(dateEnd)) ? [] :
    state.events.filter((event) => {
      if (
        event.schools.indexOf(schoolId) !== -1 &&
        dateRangesOverlap(event.dateStart, event.dateEnd, dateStart, dateEnd)
      ) {
        return true;
      }
    });
}

export function getEventsByRoomAndDates(state, params) {
  const { roomId, dateStart, dateEnd } = params;

  return (!roomId || new Date(dateStart) > new Date(dateEnd)) ? [] :
    state.events.filter((event) => {
      if (
        event.room === roomId &&
        dateRangesOverlap(event.dateStart, event.dateEnd, dateStart, dateEnd)
      ) {
        return true;
      }
    });
}