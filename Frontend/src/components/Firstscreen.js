import React from "react";
import { Link } from 'react-router-dom';
import cookie from "react-cookies";
import { Redirect } from "react-router";
// import Container from "react-bootstrap/Container";
import "./components.css";
import hsimage from '../assets/Handshakebanner.jpg';

class Firstscreen extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    // if sign in then redirect to the student profile
    let redirectVar = null;
    const studentpath = `/student/${cookie.load('id')}`;
    const companypath = `/company/${cookie.load('id')}`;

    if (cookie.load('user') === "student") {
      redirectVar = <Redirect to={studentpath} />;
    }

    if (cookie.load('user') === "company") {
      redirectVar = <Redirect to={companypath} />;
    }

    return (
      <div>
        {redirectVar}
        <img id="banner" src={hsimage} alt="handshake banner" />
        <h2 className="pagetitle">Choose an Option</h2>
        <div className="text-center" style={{ marginTop: "100px" }}>
          <Link className="firstscreenbuttons" style={{ marginRight: "20px" }} to="/student/signin">
            Student
          </Link>
          <Link className="firstscreenbuttons" style={{ marginLeft: "20px" }} to="/company/signin">
            Company
          </Link>
        </div>
      </div>
    );
  }
}

export default Firstscreen;
