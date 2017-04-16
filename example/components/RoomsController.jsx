import React, { PureComponent } from 'react';

import { Error, Success } from './Statuses.jsx';

export default class RoomsController extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      errors: {
        something: [],
      },
    };
  }

  handleRoomAdd = (event) => {
    event.preventDefault();

    const data = {
      name: event.target.name.value,
      seats: +event.target.seats.value,
      location: event.target.location.value,
    };

    this.handleResultPromise(this.props.onRoomAdd(data), 'add');
  };

  handleRoomUpdate = (event) => {
    event.preventDefault();

    const data = {
      id: event.target.id.value,
      name: event.target.name.value || undefined,
      seats: +event.target.seats.value || undefined,
      location: event.target.location.value || undefined,
    };

    this.handleResultPromise(this.props.onRoomUpdate(data), 'update' );
  };

  handleRoomRemove = (event) => {
    event.preventDefault();

    this.handleResultPromise(
      this.props.onRoomRemove({ id: event.target.id.value }),
      'remove',
    );
  };

  handleResultPromise = (promise, type) => {
    promise
      .then(() => this.setState({ errors: { [type]: [] } }))
      .catch(errors => this.setState({ errors: { [type]: errors } }));
  };

  render() {
    const { rooms } = this.props;
    const errorKey = Object.keys(this.state.errors)[0] || '';
    const successType = this.state.errors[errorKey].length > 0 ? '' : errorKey;

    return (
      <div>
        <h2>Rooms controller</h2>
        <h3>Add new room</h3>
        <form onSubmit={this.handleRoomAdd}>
          <label>name</label><input type="text" name="name" />
          <label>seats</label><input type="number" name="seats" />
          <label>location</label><input type="text" name="location" />
          <button>Add new room</button>
          <Error errors={this.state.errors.add || []} />
          { successType === 'add' ? <Success /> : null }
        </form>

        <h3>Update existing room</h3>
        <form onSubmit={this.handleRoomUpdate}>
          <label>choose room</label>
          <select name="id">
            { rooms.map((room, key) => (
              <option value={room.id} key={key}>{room.name}</option>
            )) }
          </select><br />
          <label>new name</label><input type="text" name="name" />
          <label>new number of seats</label><input type="number" name="seats" />
          <label>new location</label><input type="text" name="location" />
          <button>Update room</button>
          <Error errors={this.state.errors.update || []} />
          { successType === 'update' ? <Success /> : null }
        </form>

        <h3>Remove existing room</h3>
        <form onSubmit={this.handleRoomRemove}>
          <label>room</label>
          <select name="id">
            { rooms.map((room, key) => (
              <option value={room.id} key={key}>{room.name}</option>
            )) }
          </select>
          <button>Remove room</button>
          <Error errors={this.state.errors.remove || []} />
          { successType === 'remove' ? <Success /> : null }
        </form>
      </div>
    );
  }
}