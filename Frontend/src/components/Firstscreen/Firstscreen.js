import React from "react";
import './Firstscreen.css';
import { Link } from 'react-router-dom';
import hsimage from '../../assets/handshake.png';

class Firstscreen extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <img id="logo" src={hsimage} alt="handshake logo" />
        <h2>Choose an Option</h2>
        <div id="buttons">
          <Link to="/student/signup">
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
