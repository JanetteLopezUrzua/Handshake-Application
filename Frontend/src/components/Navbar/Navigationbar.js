import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import hslogo from '../../assets/logo.png';
import './Navigationbar.css';

class Navigationbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Navbar bg="primary" expand="lg">
        <Nav.Link>
          <img id="logo" src={hslogo} alt="handshake logo" />
        </Nav.Link>
        <Nav className="ml-auto">
          <Nav.Link style={{ color: '#ffffff', fontWeight: 'bold' }} href="#home">Jobs</Nav.Link>
          <Nav.Link style={{ color: '#ffffff', fontWeight: 'bold' }} href="#link">Events</Nav.Link>
          <Nav.Link style={{ color: '#ffffff', fontWeight: 'bold' }} href="#link">Students</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Applications</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Sign Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

export default Navigationbar;
