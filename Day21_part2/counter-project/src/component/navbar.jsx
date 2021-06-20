import React, { Component } from "react";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav style={{backgroundColor:"lightblue"}} className="navbar navbar-light bg-light">
        <a className="navbar-brand">Navbar</a>
        <button className="btn btn-primary btn-sm-2">{this.props.totalCounters}</button>
      </nav>
    );
  }
}

export default Navbar;
