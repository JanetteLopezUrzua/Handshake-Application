import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import "../components.css";
import hsimage from '../../assets/Handshakebanner.jpg';


class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      location: "",
      errormessages: {}
    };
  }

  nameChangeHandler = e => {
    this.setState({
      name: e.target.value
    });
  };

  emailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
  };

  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };

  locationChangeHandler = e => {
    this.setState({
      location: e.target.value
    });
  };

  signup = e => {
    e.preventDefault();

    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      location: this.state.location
    };

    let nameerrormsg = "";
    let locationerrormsg = "";
    let emailerrormsg = "";
    let passerrormsg = "";

    // Check that name and college inputs include letters only
    const lettandnumpatt = new RegExp("^[A-Za-z0-9 ]*$");
    const wspatt = new RegExp("^ *$");

    if (data.name === "" || wspatt.test(data.name)) {
      nameerrormsg = "Required. Enter Company Name.";
    } else if (!lettandnumpatt.test(data.name)) {
      nameerrormsg = "Company can include letters and numbers only";
    }

    if (data.location === "" || wspatt.test(data.location)) {
      locationerrormsg = "Required. Enter Location.";
    } else if (!lettandnumpatt.test(data.location)) {
      locationerrormsg = "Location can include letters and numbers only";
    }

    // Check that email input is valid
    const emailpatt = new RegExp("\\S+@\\S+\\.\\S+");

    if (data.email === "" || wspatt.test(data.email)) {
      emailerrormsg = "Required. Enter Email.";
    } else if (!emailpatt.test(data.email)) {
      emailerrormsg = "Email is not valid.";
    }

    // password is at least 8 characters and 1 number
    const passpatt = new RegExp("^[a-zA-Z0-9]{8,16}$");

    if (data.password === "" || wspatt.test(data.password)) {
      passerrormsg = "Required. Enter Password.";
    } else if (!passpatt.test(data.password)) {
      passerrormsg = "Password must be between 8 and 16 characters.";
    }

    if (
      nameerrormsg === ""
      && locationerrormsg === ""
      && emailerrormsg === ""
      && passerrormsg === ""
    ) {
      axios.defaults.withCredentials = true;

      axios
        .post("http://localhost:3001/company/signup", data)
        .then(response => {
          console.log("Status Code : ", response.status);
          this.setState({
            errormessages: {
              accounterrormsg: "",
            }
          });
        })
        .catch(error => {
          this.setState({
            errormessages: {
              accounterrormsg: error.response.data
            }
          });
        });
    } else {
      this.setState({
        errormessages: {
          nameerrormsg,
          emailerrormsg,
          passerrormsg,
          locationerrormsg,
        }
      });
    }
  };

  render() {
    // if sign up then redirect to the student profile
    let redirectVar = null;
    const path = `/company/${cookie.load('id')}`;
    if (cookie.load('user') === "company") {
      redirectVar = <Redirect to={path} />;
    }

    return (
      <div>
        {redirectVar}
        <img id="banner" src={hsimage} alt="handshake banner" />
        <h2 className="pagetitle">Sign Up</h2>
        <Form id="signup-form">
          <Form.Group controlId="name">
            <Form.Label className="labels">Company Name</Form.Label>
            <Form.Control
              style={{ textTransform: "capitalize" }}
              onChange={this.nameChangeHandler}
              placeholder="Enter Company Name"
            />
            <p className="errormessage"> {this.state.errormessages.nameerrormsg}</p>
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="Email">
              <Form.Label className="labels">Email</Form.Label>
              <Form.Control
                onChange={this.emailChangeHandler}
                type="email"
                placeholder="Enter email"
              />
              <p className="errormessage"> {this.state.errormessages.emailerrormsg}</p>
            </Form.Group>

            <Form.Group as={Col} controlId="Password">
              <Form.Label className="labels">Password</Form.Label>
              <Form.Control
                onChange={this.passwordChangeHandler}
                type="password"
                placeholder="Password"
              />
              <p className="errormessage"> {this.state.errormessages.passerrormsg}</p>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="Location">
            <Form.Label className="labels">Location</Form.Label>
            <Form.Control
              style={{ textTransform: "capitalize" }}
              onChange={this.locationChangeHandler}
              placeholder="Enter Location"
            />
            <p className="errormessage"> {this.state.errormessages.locationerrormsg}</p>
          </Form.Group>

          <p className="errormessage"> {this.state.errormessages.accounterrormsg}</p>

          <Button onClick={this.signup} className="submitbutton" type="submit">
            Sign Up
          </Button>

          <Link className="signinlink" to="/company/signin">
              Already have an account? Sign In
          </Link>
        </Form>
      </div>
    );
  }
}

export default Signup;
