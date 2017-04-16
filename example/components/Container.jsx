import React, { Component } from 'react';

import ScheduleViewer from './ScheduleViewer.jsx';
import RoomsController from './RoomsController.jsx';
import SchoolsController from './SchoolsController.jsx';
import EventsController from './EventsController.jsx';

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      schools: [],
      rooms: [],
      events: [],
    };
  }

  componentWillMount() {
    const { scheduleApi } = this.props;

    scheduleApi.subscribe(this.handleDataChange);
    this.handleDataChange();
  }

  handleDataChange = () => this.setState({ ...this.props.scheduleApi.getState() });

  render() {
    const { scheduleApi } = this.props;

    return (
      <div className="container">
        <RoomsController
          rooms={this.state.rooms}
          onRoomAdd={scheduleApi.addRoom}
          onRoomUpdate={scheduleApi.updateRoom}
          onRoomRemove={scheduleApi.removeRoom}
        />
        <SchoolsController
          schools={this.state.schools}
          onSchoolAdd={scheduleApi.addSchool}
          onSchoolUpdate={scheduleApi.updateSchool}
          onSchoolRemove={scheduleApi.removeSchool}
        />
        <EventsController
          {...this.state}
          onEventAdd={scheduleApi.addEvent}
          onEventUpdate={scheduleApi.updateEvent}
          onEventRemove={scheduleApi.removeEvent}
        />

        <ScheduleViewer
          {...this.state}
          getEventsBySchoolAndDates={scheduleApi.getEventsBySchoolAndDates}
          getEventsByRoomAndDates={scheduleApi.getEventsByRoomAndDates}
        />
      </div>
    );
  }
}
