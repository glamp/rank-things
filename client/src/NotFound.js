import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return (
      <center style={{ paddingTop: 100 }}>
        <h3>Noop!</h3>
        <hr />
        <h4>{"This page doesn't exist."}</h4>
      </center>
    );
  }
}

export default NotFound;
