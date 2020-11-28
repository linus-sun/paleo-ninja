import React, { Component } from "react";

class Ninja extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleClick = this.handleClick.bind(this); //fucking work
  }

  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  };

  componentDidMount() {
    console.log("loaded");
  }

  render() {
    return (
      <div>
        <h2>This is my class MyClassComponent</h2>
        <p>{this.state.count}</p>
        <button onClick={this.handleClick}>Count up!</button>
      </div>
    );
  }
}

export default Ninja;
