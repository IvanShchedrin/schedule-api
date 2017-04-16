import React from 'react';

const Error = (props) => (
  <div style={{ color: 'rgb(200, 0, 0)' }}>
    { props.errors.map((error, key) => <div key={key}>{error}</div>) }
  </div>
);

const Success = (props) => (
  <div style={{ color: 'rgb(0, 200, 0)' }}>
    Success!
  </div>
);

export { Success, Error };