import React, { Component } from 'react';

class HelloMessage extends Component {
  render() {
    return (
		<h1>Hello {this.props.name}！</h1>
	);
  }
};

export default HelloMessage;
 
