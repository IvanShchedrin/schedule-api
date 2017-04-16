import { findById } from '../utils';

export function newRoom(state, payload) {
  if (!payload) return ['empty room data'];

  const { name, seats } = payload;
  const reasons = [];

  if (typeof name !== 'string' || name === '') {
    reasons.push('new room must have name');
  }

  if (typeof seats !== 'number' || !(seats > 0)) {
    reasons.push('new room must have number of seats');
  }

  if (state.rooms.findIndex(item => item.name === name) !== -1) {
    reasons.push(`room with name '${name}' already exists`);
  }

  return reasons.length === 0 ? false : reasons;
}

export function updateRoom(state, payload) {
  const { id, name, seats, location } = payload;
  const reasons = [];
  const foundRoom = findById(state.rooms, id);

  if (typeof foundRoom === 'undefined') {
    reasons.push(`cant find room with id '${id}'`);
    return reasons;
  }

  if (name && typeof name !== 'string') {
    reasons.push('invalid name');
  }

  if (location && typeof location !== 'string') {
    reasons.push('invalid location');
  }

  if (typeof seats !== 'undefined' && seats < foundRoom.seats) {
    state.events.forEach((event) => {
      if (event.room === id) {
        const schools = findById(state.schools, event.schools) || [];

        if (schools.reduce((result, item) => result -= item.amount, seats) < 0) {
          reasons.push(`event '${event.name}' hasn't enough seats`);
        }
      }
    });
  }

  return reasons.length === 0 ? false : reasons;
}

export function removeRoom(state, payload) {
  const { id } = payload;
  const reasons = [];
  const foundRoom = findById(state.rooms, id);

  if (typeof foundRoom === 'undefined') {
    reasons.push(`cant find room with id '${id}'`);
    return reasons;
  }

  const badIndex = state.events.findIndex(event => event.room === id);

  if (badIndex !== -1) {
    reasons.push(`event '${state.events[badIndex].name}' uses provided room`);
  }

  return reasons.length === 0 ? false : reasons;
}