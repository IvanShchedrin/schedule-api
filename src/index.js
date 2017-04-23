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

// Не буду расписывать идею redux-а. Подробнее можно почитать тут goo.gl/gjhhPT
const scheduleApi = combineReducers({
  rooms,
  schools,
  events,
});

// Для включения возможности чтения/записи в локалстор браузера прокидываем параметры со свойством localStorage: true
// Это даст возможность использовать библиотеку без браузера (например в node-сервере)
export default class Schedule {
  constructor(params = {}) {
    this._store = createStore(
      scheduleApi,
      params.localStorage ? loadState() : undefined,
      applyMiddleware(thunk),
    );

    if (params.localStorage) {
      this._store.subscribe(() => saveState(this._store.getState()));
    }
  }

  // Возвращает все данные из коллекции
  getState = () => this._store.getState();
  // Подписывает коллбек на изменения: при каждом диспатче высовется коллбек, в котором будет доступна вся коллекция
  subscribe = (cb) => this._store.subscribe(cb);

  // Выборка событий по школе и начальной и конечной дате
  getEventsBySchoolAndDates = (schoolId, dateStart, dateEnd) => {
    return queries.getEventsBySchoolAndDates(this._store.getState(), { schoolId, dateStart, dateEnd });
  };
  // выборка событий по комнате и начальной и конечной дате
  getEventsByRoomAndDates = (roomId, dateStart, dateEnd) => {
    return queries.getEventsByRoomAndDates(this._store.getState(), { roomId, dateStart, dateEnd });
  };

  // Возвращает строку в JSON формате. Здесь можно извращаться с данными как угодно, преобразовывая во что угодно
  exportData = () => JSON.stringify(this._store.getState());
  // Импортирт данных в JSON формате. Безопасно пытается добавить все данные, используя проверки из ./*entity*/checks.js
  // Если хотя бы одна проверка будет провалена - вернет rejected-промис и ничего не сделает с коллекцией
  importData = payload => importData.call(this, payload);

  // Методы для добавления данных. В случае, если такую сущность создать нельзя - вернет массив строк и описаниями,
  // почему произошла ошибка.
  // Только при написании UI-примера дошло, что намного лучше возвращать объект с полями
  // isSuccess, errors и т.д. А в идеале возвращать промис! :)
  addRoom = payload => resolveResult( this._store.dispatch(roomsActions.addRoom(payload)) );
  addSchool = payload => resolveResult( this._store.dispatch(schoolsActions.addSchool(payload)) );
  addEvent = payload => resolveResult( this._store.dispatch(eventsActions.addEvent(payload)) );

  updateRoom = payload => resolveResult( this._store.dispatch(roomsActions.updateRoom(payload)) );
  updateSchool = payload => resolveResult( this._store.dispatch(schoolsActions.updateSchool(payload)) );
  updateEvent = payload => resolveResult( this._store.dispatch(eventsActions.updateEvent(payload)) );

  removeRoom = payload => resolveResult( this._store.dispatch(roomsActions.removeRoom(payload)) );
  removeSchool = payload => resolveResult( this._store.dispatch(schoolsActions.removeSchool(payload)) );
  removeEvent = payload => resolveResult( this._store.dispatch(eventsActions.removeEvent(payload)) );
}