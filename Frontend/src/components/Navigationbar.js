import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import NavDropdown from "react-bootstrap/NavDropdown";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { FaSearch } from 'react-icons/fa';
// import {Redirect} from 'react-router';
import hslogo from '../assets/logo.JPG';


class Navigationbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {


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
         <InputGroup>
           <InputGroup.Prepend>
             <InputGroup.Text className="searchbar">
               <FaSearch />
             </InputGroup.Text>
           </InputGroup.Prepend>
           <Form.Control
             className="searchbar"
             id="searchtext"
             type="text"
             placeholder="Search"
           />
         </InputGroup>
         <Nav className="ml-auto">
           <Nav.Link className="navbaritem" href="#home"><span>Jobs</span></Nav.Link>
           <Nav.Link className="navbaritem" href="#link"><span>Events</span></Nav.Link>
           <Nav.Link className="navbaritem" href="#link"><span>Q&amp;A</span></Nav.Link>
           <Nav.Link className="navbaritem" href="#link"><span>Students</span></Nav.Link>
           <Nav.Link className="navbaritem" href="#link"><span>Messages</span></Nav.Link>
           <Nav.Link className="navbaritem" href="#link"><span>Career Center</span></Nav.Link>
           <NavDropdown
             className="navbaritem"
             title=""
             id="basic-nav-dropdown"
           >
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
