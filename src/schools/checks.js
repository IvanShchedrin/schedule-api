import { findById } from '../utils';

export function newSchool(state, payload) {
  const { name, amount } = payload;
  const reasons = [];

  if (state.schools.findIndex(item => item.name === name) !== -1) {
    reasons.push(`school with name '${name}' already exists`);
  }

  if (typeof name !== 'string' || name === '') {
    reasons.push('new school must have name');
  }

  if (typeof amount !== 'number' || amount < 0) {
    reasons.push('new school must have number of students');
  }

  return reasons.length === 0 ? false : reasons;
}

export function updateSchool(state, payload = {}) {
  const { name, amount, id } = payload;
  const reasons = [];
  const school = findById(state.schools, id);

  if (typeof school === 'undefined') {
    reasons.push(`cant find school with id '${id}'`);
    return reasons;
  }

  if (typeof name !== 'undefined' && typeof name !== 'string' || name === '') {
    reasons.push('school name must be a string');
  }

  if (
    (typeof amount !== 'undefined' && typeof amount !== 'number') ||
    (typeof amount === 'number' && amount < 0)
  ) {
    reasons.push('invalid amount');
    return reasons;
  }

  if (typeof amount !== 'undefined') {
    const commonEventSchools = { [school.id]: school };

    state.events.forEach((event) => {
      if (event.schools.findIndex(schoolId => schoolId === school.id) !== -1) {
        event.schools.forEach((schoolId) => {
          if (!commonEventSchools[schoolId]) {
            commonEventSchools[schoolId] = findById(state.schools, schoolId);
          }
        });
      }
    });

    const eventWithOverloadAmountIndex = state.events.findIndex((event) => {
      if (event.schools.findIndex(item => item === school.id) === -1) {
        return false;
      }
      const room = findById(state.rooms, event.room);
      const totalAmount = event.schools.reduce((result, schoolId) => result += commonEventSchools[schoolId].amount, 0);

      return (totalAmount - school.amount + amount) > room.seats;
    });

    if (eventWithOverloadAmountIndex !== -1) {
      reasons.push(`event '${state.events[eventWithOverloadAmountIndex].name}' hasn't enough seats`);
    }
  }

  return reasons.length === 0 ? false : reasons;
}

export function removeSchool(state, payload = {}) {
  const { id } = payload;
  const reasons = [];
  const school = findById(state.schools, id);

  if (typeof school === 'undefined') {
    reasons.push(`cant find school with id '${id}'`);
  }

  return reasons.length === 0 ? false : reasons;
}