import React, { PureComponent } from 'react';

import { findById } from '../../src/utils';

export default class ScheduleViewer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      isShown: false,
    }
  }

  handleFilterSubmit = (event, type) => {
    event.preventDefault();

    const id = event.target.id.value;
    const dateStart = event.target.dateStart.value;
    const dateEnd = event.target.dateEnd.value;

    const events = type === 'school' ? this.props.getEventsBySchoolAndDates(id, dateStart, dateEnd) :
      this.props.getEventsByRoomAndDates(id, dateStart, dateEnd);

    this.setState({ events, isShown: true });
  };

  handleClose = () => this.setState({ isShown: false });

  render() {
    const { rooms, schools } = this.props;
    const { events, isShown } = this.state;
    let scheduleItems = [];

    if (isShown) {
      scheduleItems = events.map((event, key) => {
        const room = findById(rooms, event.room) || {};
        const foundSchools = findById(schools, event.schools) || [];

        return (
          <div key={key} style={{ marginBottom: '20px' }}>
            name: {event.name}; <br />
            lecturer: {event.lecturer}; <br />
            starts: {new Date(event.dateStart).toString()}; <br />
            ends: {new Date(event.dateEnd).toString()}; <br />
            room: {room.name} ({room.location}), {room.seats} seats; <br />
            schools: {foundSchools.map((school, key) => <span key={key}>{school.name} (school.amount), </span>)}
          </div>
        );
      });
    }

    return (
      <div>
        <h2>Data viewer</h2>
        <h3>Show schedule by school and date range</h3>
        <form onSubmit={e => this.handleFilterSubmit(e, 'school')}>
          <label>choose school</label>
          <select name="id">
            { schools.map((school, key) => (
              <option value={school.id} key={key}>{school.name}</option>
            )) }
          </select>
          <label>date start (yyyy-mm-dd hh:mm)</label><input type="text" name="dateStart" />
          <label>date end (yyyy-mm-dd hh:mm)</label><input type="text" name="dateEnd" />
          <button>Show schedule</button>
        </form>

        <h3>Show schedule by room and date range</h3>
        <form onSubmit={e => this.handleFilterSubmit(e, 'room')}>
          <label>choose room</label>
          <select name="id">
            { rooms.map((room, key) => (
              <option value={room.id} key={key}>{room.name}</option>
            )) }
          </select>
          <label>date start (yyyy-mm-dd hh:mm)</label><input type="text" name="dateStart" />
          <label>date end (yyyy-mm-dd hh:mm)</label><input type="text" name="dateEnd" />
          <button>Show schedule</button>
        </form>

        <div className="scheduleWrapper" style={{ display: isShown ? 'block' : 'none' }}>
          <button className="closeButton" onClick={this.handleClose}>Close</button>
          <div className="schedule">
            {scheduleItems.length > 0 ? scheduleItems : <h2>Any data was found</h2>}
          </div>
        </div>
      </div>
    );
  }
}
