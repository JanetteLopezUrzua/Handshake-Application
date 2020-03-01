import React from "react";
import { Link } from 'react-router-dom';
import cookie from "react-cookies";
import { Redirect } from "react-router";
import "./components.css";
import Container from "react-bootstrap/Container";
import hsimage from '../assets/Handshakebanner.jpg';

class Firstscreen extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    // if sign in then redirect to the student profile
    let redirectVar = null;
    const path = `/student/${cookie.load('id')}`;
    if (cookie.load('id')) {
      redirectVar = <Redirect to={path} />;
    }
    return (
      <div>
        {redirectVar}
        <img id="banner" src={hsimage} alt="handshake banner" />
        <h2 className="pagetitle">Choose an Option</h2>
        <div id="firstscreenbuttonscontainer">
          <Link className="firstscreenbuttons" to="/student/signin">
            Student
          </Link>
          <Link className="firstscreenbuttons" to="/company/signup">
            Company
          </Link>
        </div>
      </div>
    );
  }
}

export default Firstscreen;
