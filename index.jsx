import React from 'react';
import ReactDOM from 'react-dom';
import Container from './components/Container.jsx';
import ScheduleAPI from '../index';

const scheduleApi = new ScheduleAPI({ localStorage: true });
window.scheduleApi = scheduleApi;

ReactDOM.render(
  <Container scheduleApi={scheduleApi} />,
  document.getElementById('root'),
);