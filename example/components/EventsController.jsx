import React, { PureComponent } from 'react';

import { Error, Success } from './Statuses.jsx';

export default class EventsController extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      errors: {
        something: [],
      },
    };
  }

  handleEventAdd = (event) => {
    event.preventDefault();

    const data = {
      name: event.target.name.value,
      lecturer: event.target.lecturer.value,
      dateStart: event.target.dateStart.value,
      dateEnd: event.target.dateEnd.value,
      schools: [].map.call(event.target.schools.selectedOptions, item => item.value),
      room: event.target.room.value,
    };

    this.handleResultPromise(
      this.props.onEventAdd(data),
      'add'
    );
  };

  handleEventUpdate = (event) => {
    event.preventDefault();

    const schools = [].map.call(event.target.schools.selectedOptions, item => item.value);

    const data = {
      id: event.target.id.value,
      name: event.target.name.value || undefined,
      lecturer: event.target.lecturer.value || undefined,
      dateStart: event.target.dateStart.value || undefined,
      dateEnd: event.target.dateEnd.value || undefined,
      schools: schools.length > 0 ? schools : undefined,
      room: event.target.room.value || undefined,
    };

    this.handleResultPromise(this.props.onEventUpdate(data), 'update');
  };

  handleEventRemove = (event) => {
    event.preventDefault();

    this.handleResultPromise(
      this.props.onEventRemove({ id: event.target.id.value }),
      'remove',
    );
  };

  handleResultPromise = (promise, type) => {
    promise
      .then(() => this.setState({ errors: { [type]: [] } }))
      .catch(errors => this.setState({ errors: { [type]: errors } }));
  };

  render() {
    const { schools, events, rooms } = this.props;
    const errorKey = Object.keys(this.state.errors)[0] || '';
    const successType = this.state.errors[errorKey].length > 0 ? '' : errorKey;

    return (
      <div>
        <h2>Events controller</h2>
        <h3>Add new event</h3>
        <form className="addForm" onSubmit={this.handleEventAdd}>
          <label>name</label><input type="text" name="name" />
          <label>lecturer</label><input type="text" name="lecturer" />
          <label>date start</label><input type="text" name="dateStart" placeholder="yyyy-mm-dd hh:mm" />
          <label>date end</label><input type="text" name="dateEnd" placeholder="yyyy-mm-dd hh:mm" />
          <label>room</label>
          <select name="room">
            { rooms.map((room, key) => (
              <option value={room.id} key={key}>{room.name}</option>
            )) }
          </select>
          <label>schools</label>
          <select name="schools" multiple>
            { schools.map((school, key) => (
              <option value={school.id} key={key}>{school.name}</option>
            )) }
          </select><br />
          <button>Add new event</button>
          <Error errors={this.state.errors.add || []} />
          { successType === 'add' ? <Success /> : null }
        </form>

        <h3>Update existing event</h3>
        <form className="updateForm" onSubmit={this.handleEventUpdate}>
          <label>choose event</label>
          <select name="id">
            { events.map((event, key) => (
              <option value={event.id} key={key}>{event.name}</option>
            )) }
          </select><br />
          <label>name</label><input type="text" name="name" />
          <label>lecturer</label><input type="text" name="lecturer" />
          <label>date start</label><input type="text" name="dateStart" placeholder="yyyy-mm-dd hh:mm" />
          <label>date end</label><input type="text" name="dateEnd" placeholder="yyyy-mm-dd hh:mm" />
          <label>room</label>
          <select name="room">
            { rooms.map((room, key) => (
              <option value={room.id} key={key}>{room.name}</option>
            )) }
          </select>
          <label>schools</label>
          <select name="schools" multiple>
            { schools.map((school, key) => (
              <option value={school.id} key={key}>{school.name}</option>
            )) }
          </select><br />
          <button>Update event</button>
          <Error errors={this.state.errors.update || []} />
          { successType === 'update' ? <Success /> : null }
        </form>

        <h3>Remove existing event</h3>
        <form className="removeForm" onSubmit={this.handleEventRemove}>
          <label>choose event</label>
          <select name="id">
            { events.map((event, key) => (
              <option value={event.id} key={key}>{event.name}</option>
            )) }
          </select><br />
          <button>Remove event</button>
          <Error errors={this.state.errors.remove || []} />
          { successType === 'remove' ? <Success /> : null }
        </form>
      </div>
    );
  }
}