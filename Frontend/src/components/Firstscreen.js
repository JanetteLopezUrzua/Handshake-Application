import React from "react";
import { Link } from 'react-router-dom';
import cookie from "react-cookies";
import { Redirect } from "react-router";
import "./components.css";
import hsimage from '../assets/handshake.png';

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
        <h2>Choose an Option</h2>
        <div id="buttons">
          <Link to="/student/signin">
            <div className="btn">
              Student
            </div>
          </Link>
          <Link to="/company/signup">
            <div className="btn">
              Company
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Firstscreen;
