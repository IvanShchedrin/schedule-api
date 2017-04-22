import React, { PureComponent } from 'react';

import { Error, Success } from './Statuses.jsx';

export default class SchoolsController extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      errors: {
        something: [],
      },
    };
  }

  handleSchoolAdd = (event) => {
    event.preventDefault();

    const data = {
      name: event.target.name.value || undefined,
      amount: +event.target.amount.value || undefined,
    };

    this.handleResultPromise(
      this.props.onSchoolAdd(data),
      'add'
    );
  };

  handleSchoolUpdate = (event) => {
    event.preventDefault();

    const data = {
      id: event.target.id.value,
      name: event.target.name.value || undefined,
      amount: +event.target.amount.value || undefined,
    };

    this.handleResultPromise(this.props.onSchoolUpdate(data), 'update');
  };

  handleSchoolRemove = (event) => {
    event.preventDefault();

    this.handleResultPromise(
      this.props.onSchoolRemove({ id: event.target.id.value }),
      'remove',
    );
  };

  handleResultPromise = (promise, type) => {
    promise
      .then(() => this.setState({ errors: { [type]: [] } }))
      .catch(errors => this.setState({ errors: { [type]: errors } }));
  };

  render() {
    const { schools } = this.props;
    const errorKey = Object.keys(this.state.errors)[0] || '';
    const successType = this.state.errors[errorKey].length > 0 ? '' : errorKey;

    return (
      <div>
        <h2>Schools controller</h2>
        <h3>Add new school</h3>
        <form onSubmit={this.handleSchoolAdd}>
          <label>name</label><input type="text" name="name" />
          <label>amount</label><input type="number" name="amount" /><br />
          <button>Add new school</button>
          <Error errors={this.state.errors.add || []} />
          { successType === 'add' ? <Success /> : null }
        </form>

        <h3>Update existing school</h3>
        <form onSubmit={this.handleSchoolUpdate}>
          <label>choose school</label>
          <select name="id">
            { schools.map((school, key) => (
              <option value={school.id} key={key}>{school.name}</option>
            )) }
          </select>
          <label> new name</label><input type="text" name="name" />
          <label>new amount</label><input type="number" name="amount" /><br />
          <button>Update school</button>
          <Error errors={this.state.errors.update || []} />
          { successType === 'update' ? <Success /> : null }
        </form>

        <h3>Remove existing school</h3>
        <form onSubmit={this.handleSchoolRemove}>
          <label>school</label>
          <select name="id">
            { schools.map((school, key) => (
              <option value={school.id} key={key}>{school.name}</option>
            )) }
          </select><br />
          <button>Remove school</button>
          <Error errors={this.state.errors.remove || []} />
          { successType === 'remove' ? <Success /> : null }
        </form>
      </div>
    );
  }
}