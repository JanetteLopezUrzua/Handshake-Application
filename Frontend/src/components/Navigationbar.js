import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
// import {Redirect} from 'react-router';
import hslogo from '../assets/logo.JPG';


class Navigationbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

   // handle logout to destroy the cookie
   handleLogout = () => {
     cookie.remove('id', { path: '/' });
   }

   render() {
     return (
       <Navbar id="navbar" expand="lg">
         <Nav.Link>
           <img id="logo" src={hslogo} alt="handshake logo" />
         </Nav.Link>
         <Nav className="ml-auto">
           <Nav.Link href="#home">Jobs</Nav.Link>
           <Nav.Link href="#link">Events</Nav.Link>
           <Nav.Link href="#link">Students</Nav.Link>
           <NavDropdown title="Dropdown" id="basic-nav-dropdown">
             <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
             <NavDropdown.Item href="#action/3.2">Applications</NavDropdown.Item>
             <NavDropdown.Divider />
             <Link onClick={this.handleLogout} to="/">Sign Out</Link>
           </NavDropdown>
         </Nav>
       </Navbar>
     );
   }
}

export default Navigationbar;
