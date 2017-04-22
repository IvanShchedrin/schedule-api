## Schedule API 🤘
[Задание 2](https://academy.yandex.ru/events/frontend/shri_msk-2017/)

### Обоснование выбора инструментов
За основу была взята библиотека Redux. Основные причины выбора:
- Объем (около 2kb);
- Наличие необходимого функционала для работы с коллекциями - подписка на изменения, простой доступ к коллекции;
- Удобство внедрения проверок на возможность изменения коллекции;
- Хорошая документация;
- Популярность.
Также в зависимостях присутствуют:
- uuid, необходимый для создания уникальных ID;
- redux-thunk-middleware, использующийся для доступа к коллекции в actions.

### Что реализовано
- Возможность создания, изменения и удаления информации о лекциях, школах и аудиториях;
- Выполнение проверок на возможность создания, изменения или удаления данных;
- Просмотр расписания школы в заданный интервал дат;
- Просмотр графика лекций в аудитории в заданный интервал дат;
- Сериализация/десериализация в JSON;
- Постоянное хранение данных в памяти браузера;
- Веб-интерфейс и интерфейс командной строки для демонстрации возможностей библиотеки.

### О реализации
Входной файл проекта - src/index.js. В нем объявляется класс, содержащий все необходимые методы для работы с данными.  
Если нужно включить сохранение данных в localStorage браузера, необходимо прокинуть в конструктор параметр localStorage: true. При каждом изменении данных библиотека запишет в localStorage всю коллекцию. После перезагрузки страницы сессия будет восстановлена.  
Алгоритм добавления данных в коллекцию следующий:
- Вызывает необходимый метод добавления, изменения или удаления.
- Данные передаются в action, в котором производится проверка на возможность выполнения действия.
- В ходе проверки формируется массив ошибок. Если ошибок нет, значит данные корректные и можно делать необходимые действия с коллекцией: по action type выбирается reducer, который выполняет простые действия с коллекцией (добавление нового объекта, изменение существующего со слиянием параметров или удаление). Если ошибки есть, диспатчится ошибка.
- Результат выполнения дополнительно оборачивается в функцию resolveResult, которая, в зависимости от результата проверок, возвращает resolved- или rejected-промис.  

В исходном коде есть комментарии, по которым можно подробнее узнать о тонкостях реализации. Начать следует с входного файла src/index.js, а также посмотреть сущность rooms. Остальные сущности не были прокомментированы, т.к. они сделаны по-аналогии с аудиториями. 

Полноценный пример использования можно посмотреть в директории example. Он опубликован на gh-pages здесь: https://oktava6.github.io/schedule-api/  
Он страшный (множество форм, выглядит жутко), но полноценный. Есть возможность добавлять/изменять/удалять информацию о событиях/школах/комнатах, просматривать события по школам/комнатам и датам, импортировать/экспортировать в JSON. Также можно попробовать библиотеку из консоли - экземпляр доступен в глобальной переменной "scheduleApi".

### Проблемы
К сожалению, не успел написать тесты. Вообще, Redux очень легко покрывается тестами. В этом проекте я скорее всего использовал бы Jasmine, т.к. он прост и не требует наличия DOMа.

### Запуск примера:
$ npm i  
$ npm run example  
-> localhost:8080/example

### Сборка и деплой примера на gh-pages:
$ npm run example:build  
$ npm run gh:publish  
-> https://oktava6.github.io/schedule-api/
