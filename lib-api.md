## Программный интерфейс библиотеки

### Начало работы  
#### Добавление библиотеки к зависимостям  
`npm i --save https://github.com/oktava6/schedule-api.git`  

#### Импорт  
`import ScheduleAPI from 'shcedule-api'`  
  
#### Создание экземпляра хранилища  
`const schedule = new ScheduleAPI(params)`  

### Параметры для создания хранилища  
`localStorage: bool (default - false)`  
Включает записать в localStorage браузера после каждого изменении коллекции.  
  
`storeAlias: string (default - 'state')`  
Имя коллекции - ключ для localStorage. Если на одном клиенте инициализировать хранилища с разными ключами, будут храниться все коллекции под соответствующими ключами.

## Доступные методы  
  
#### `getState ()`  
Возвращает всю коллекцию.
  
#### `subscribe (callback: function)`  
Подписывает callback на изменения - он будет вызван всякий раз, когда коллекция изменяется (данные добавились, изменились или удалились).
  
#### `getEventsBySchoolAndDates (schoolId: string, dateStart: string, dateEnd: string)`  
Возвращает события, отфильтрованные по школе, начальной и конечной датам.
  
#### `getEventsByRoomAndDates (roomId: string, dateStart: string, dateEnd: string)`  
Возвращает события, отфильтрованные по аудитории, начальной и конечной датам.
  
#### `exportData ()`  
Возвращает всю коллекцию в виде JSON-строки.
  
#### `importData (payload: object)`  
Импортирует данные в виде JSON-строки. Проиводятся проверки на возможность добавления переданных данных. В случе, если хотя бы она проверка провалена - данные не добавятся. В противром случае вся текущая коллекция заменится на импортируемую.
  
#### `addRoom (payload: object)` 
Добавляет новую аудиторию. Обязательные атрибуты - name, seats, location.
  
#### `addSchool (payload: object)`  
Добавляет новую школу. Обязательные атрибуты - name, amount.
  
#### `addEvent (payload: object)` 
Добавляет новое соытие. Обязательные атрибуты - name, lecturer, dateStart, dateEnd, schools (массив id школ), room (id аудитории).
  
#### `updateRoom (payload: object)`  
Изменение существующей аудитории. Обязательные атрибуты: id. Возможные атрибуты: name, seats, location.
  
#### `updateSchool (payload: object)`  
Изменение существующей школы. Обязательные атрибуты: id. Возможные атрибуты: name, amount.
  
#### `updateEvent (payload: object)`  
Изменение существующего события. Обязательные атрибуты: id. Возможные атрибуты: name, lecturer, dateStart, dateEnd, schools (массив id школ), room (id аудитории).
  
#### `removeRoom (payload: object)`  
Удаление существующей комнаты. Обязательный атрибут: id.
  
#### `removeSchool (payload: object)`  
Удаление существующей школы. Обязательный атрибут: id.
  
#### `removeEvent (payload: object)`  
Удаление существующего события. Обязательный атрибут: id.
