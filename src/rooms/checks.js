import { findById } from '../utils';

// Проверка на возможность добавления новой комнаты с переданными параметрами.
// Здесь есть доступ ко всей коллекции, что позволяет делать любые проверки, например:
export function newRoom(state, payload) {
  const { name, seats } = payload;
  const reasons = [];

  // Если имя не задано или пустое имя - плохо. Добавляем сообщение об ошибке в массив и идем дальше
  // Можем прямо здесь вернуть массив ошибок в случае, если дальнейшие проверки невозможны
  if (typeof name !== 'string' || name === '') {
    reasons.push('new room must have name');
  }
  // Если не задано количество комнат или их меньше нуля - плохо
  if (typeof seats !== 'number' || seats < 0) {
    reasons.push('new room must have number of seats');
  }
  // Если найдена комната с таким именем - плохо
  if (state.rooms.findIndex(item => item.name === name) !== -1) {
    reasons.push(`room with name '${name}' already exists`);
  }
  // Ну и так далее...
  // В итоге получаем или пустой массив - значит все хорошо, или не пустой массив - что-то не так и
  // такую комнату мы не можем добавить
  return reasons.length === 0 ? false : reasons;
}

// Проверка на возможность обновления комнаты
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

  // Здесь проверка посложнее. Если количество мест уменьшилось, проходим по всем событиям, которые используют
  // эту комнату и считаем количество студентов на лекции. Если их больше, чем количество мест в аудитории, пушим ошибку
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

// Удаляем комнату
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