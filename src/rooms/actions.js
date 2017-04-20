import * as check from './checks';
import { clearFields } from '../utils';

// Не стал из-за четырех констант создавать отдельную переменную.
// Показалось логичным, что в экшенах могут оказаться actionTypes
export const ADD_ROOM = 'add new room';
export const UPDATE_ROOM = 'update room by id';
export const REMOVE_ROOM = 'remove room by id';
export const IMPORT_ROOMS = 'import rooms';

// Action creator. Добавляет новую комнату
export function addRoom(payload) {
  return (dispatch, getState) => {
    // Очищаем получанные данные от лишних свойств
    const clearedData = clearFields('rooms', payload);
    // Проходим проверки
    const errors = check.newRoom(getState(), clearedData);

    // Если вернулся массив ошибок, значит какие-то проверки не пройдены. Диспатчим ошибку
    // Все оитальные action creator-ы аналогичны этому
    return dispatch(errors ?
      { type: 'error', errors } :
      { type: ADD_ROOM, payload: clearedData });
  };
}

// Изменение существующей комнаты по ID
export function updateRoom(payload) {
  return (dispatch, getState) => {
    const clearedData = clearFields('rooms', payload);
    const errors = check.updateRoom(getState(), clearedData);

    return dispatch(errors ?
      { type: 'error', errors } :
      { type: UPDATE_ROOM, payload: clearedData });
  }
}

// Удаление комнаты по ID
export function removeRoom(payload) {
  return (dispatch, getState) => {
    const errors = check.removeRoom(getState(), payload);

    return dispatch(errors ?
      { type: 'error', errors } :
      { type: REMOVE_ROOM, payload });
  };
}

// Импорт готовой коллекции комнат. Кладется в стор as is
export function importRooms(payload) {
  return (dispatch, getState) => dispatch({ type: IMPORT_ROOMS, payload });
}