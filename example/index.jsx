import React from 'react';
import ReactDOM from 'react-dom';
import Container from './components/Container.jsx';

// Импортируем библиотеку. Можно поставить как npm-зависимость и испортить из node-модулей
import ScheduleAPI from '../index';

// Инициализируем. Полученный экземпляр классы ScheduleAPI имеет все необходимые методы для работы
// с коллекцией. Параметр localStorage включает/выключает работу с локалстором браузера
const scheduleApi = new ScheduleAPI({ localStorage: true });
// Сохраняю в глобальную пепеменную чтобы можно была поиграть с библиотекой из консоли
window.scheduleApi = scheduleApi;

// Рендерим React-контейнер
ReactDOM.render(
  <Container scheduleApi={scheduleApi} />,
  document.getElementById('root'),
);