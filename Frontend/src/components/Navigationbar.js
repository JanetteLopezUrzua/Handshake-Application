import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { FaSearch } from 'react-icons/fa';
import axios from "axios";
// import {Redirect} from 'react-router';
import hslogo from '../assets/logo.JPG';


class Navigationbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: cookie.load("id"),
      // fname: "",
      photo: "",
      has_image: false,
      firstnameletter: "",
      lastnameletter: "",

      // Company
      // name: "",
      nameletter: "",
    };
  }

  componentDidMount() {
    if (cookie.load("user") === "student") this.getStudentImage();
    if (cookie.load("user") === "company") this.getCompanyImage();
  }

  // componentDidUpdate(props, state) {
  //   if (this.props.photochange !== props.photochange) {
  //     this.getImage();
  //   }
  //   // this.props.photochange = false;
  //   console.log("THIS PROPS ARE", this.props);
  //   console.log("THE CURRENT PROPS ARE", props);
  //   console.log("THE CURRENTS STATE", state);
  // }

  getStudentImage() {
    // console.log("STUDENT NAV BAR", this.state.id);
    axios
      .get(`http://localhost:3001/student/navbar/${this.state.id}`)
      .then(response => {
        const info = response.data;

        const fn = info.fname.charAt(0);
        const ln = info.lname.charAt(0);

        console.log(response.data);
        this.setState({
        //  fname: info.fname,
          photo: info.photo,
          firstnameletter: fn,
          lastnameletter: ln
        });

        if (this.state.photo === "" || this.state.photo === null) {
          this.setState({
            has_image: false
          });
        } else {
          const imageURL = `${Buffer.from(info.photo).toString()}`;

          this.setState({
            photo: imageURL,
            has_image: true
          });
        }

        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
        console.log(error.response.data);
      });
  }

  getCompanyImage() {
    // console.log("Company NAV BAR", this.state.id);
    axios
      .get(`http://localhost:3001/company/navbar/${this.state.id}`)
      .then(response => {
        const info = response.data;

        const cn = info.name.charAt(0);

        console.log(response.data);
        this.setState({
          // name: info.name,
          photo: info.photo,
          nameletter: cn,
        });

        if (this.state.photo === "" || this.state.photo === null) {
          this.setState({
            has_image: false
          });
        } else {
          const imageURL = `${Buffer.from(info.photo).toString()}`;

          this.setState({
            photo: imageURL,
            has_image: true
          });
        }

        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
        console.log(error.response.data);
      });
  }

  // handle logout to destroy the cookie
  handleLogout = () => {
    cookie.remove('id', { path: '/' });
    cookie.remove('user', { path: '/' });
  }

  render() {
    let img = "";

    if (cookie.load("user") === "student") {
      if (this.state.has_image === true) {
        img = (
          <Container>
            <img
              className="navbarpic"
              src={this.state.photo}
              alt="user profile pic"
              roundedcircle="true"
            />
          </Container>
        );
      } else {
        img = (
          <div>
            <p
              className="navbarpic"
            >
              {this.state.firstnameletter}
              {this.state.lastnameletter}
            </p>
          </div>
        );
      }
    }

    if (cookie.load("user") === "company") {
      if (this.state.has_image === true) {
        img = (
          <Container>
            <img
              className="navbarpic"
              src={this.state.photo}
              alt="user profile pic"
              roundedcircle="true"
            />
          </Container>
        );
      } else {
        img = (
          <div>
            <p
              className="navbarpic"
            >
              {this.state.nameletter}
            </p>
          </div>
        );
      }
    }

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
            type="search"
            placeholder="Search"
          />
        </InputGroup>
        <Nav className="ml-auto">
          <Nav.Link className="navbaritem" href="#home"><span>Jobs</span></Nav.Link>
          <Link className="navbaritem" to={`/${cookie.load("user")}/events`}><span>Events</span></Link>
          <Nav.Link className="navbaritem" href="#link"><span>Q&amp;A</span></Nav.Link>
          <Link className="navbaritem" to={`/${cookie.load("user")}/students`}><span>Students</span></Link>
          <Nav.Link className="navbaritem" href="#link"><span>Messages</span></Nav.Link>
          <Nav.Link className="navbaritem" href="#link"><span>Career Center</span></Nav.Link>
          <NavDropdown
            className="navbardropdown"
            title={img}
          >
            <Link to={`/${cookie.load("user")}/${cookie.load("id")}`}>Profile</Link>
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
