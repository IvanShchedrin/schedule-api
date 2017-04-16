import React from 'react';
import ReactDOM from 'react-dom';
import Container from './components/Container.jsx';
import ScheduleAPI from '../src/index';

ReactDOM.render(
  <Container scheduleApi={new ScheduleAPI()} />,
  document.getElementById('root'),
);