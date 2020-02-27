import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./Signup.css";
import axios from "axios";
// import cookie from "react-cookies";
// import { Redirect } from "react-router";
import hsimage from "../../../assets/handshake.png";

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

  companyNameChangeHandler = e => {
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

    // Check that name input includes letters only
    const lettpatt = new RegExp("^[a-zA-Z ]*$");

    if (data.name === "") {
      nameerrormsg = "Required. Enter Company Name.";
    } else if (!lettpatt.test(data.name)) {
      nameerrormsg = "Name can include letters only";
    }

    // Check that location input includes letters and numbers only
    const lettandnumpatt = new RegExp("^[A-Za-z0-9 ]*$");

    if (data.location === "") {
      locationerrormsg = "Required. Enter Location.";
    } else if (!lettandnumpatt.test(data.location)) {
      locationerrormsg = "Location can include letters and numbers only";
    }

    // Check that email input is valid
    const emailpatt = new RegExp("\\S+@\\S+\\.\\S+");

    if (data.email === "") {
      emailerrormsg = "Required. Enter Email.";
    } else if (!emailpatt.test(data.email)) {
      emailerrormsg = "Email is not valid.";
    }

    // password is at least 8 characters and 1 number
    const passpatt = new RegExp("^[a-zA-Z0-9]{8,16}$");

    if (data.password === "") {
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
      axios
        .post("http://localhost:3001/company/signup", data)
        .then(response => {
          console.log("Status Code : ", response.status);
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
    return (
      <div>
        <img id="logo" src={hsimage} alt="handshake logo" />
        <h2>Sign Up</h2>
        <Form id="signup-form">
          <Form.Group controlId="Name">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              onChange={this.companyNameChangeHandler}
              placeholder="Enter Company Name"
            />
            <p> {this.state.errormessages.nameerrormsg}</p>
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="Email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={this.emailChangeHandler}
                type="email"
                placeholder="Enter Email"
              />
              <p> {this.state.errormessages.emailerrormsg}</p>
            </Form.Group>

            <Form.Group as={Col} controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={this.passwordChangeHandler}
                type="password"
                placeholder="Password"
              />
              <p> {this.state.errormessages.passerrormsg}</p>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="Location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              onChange={this.locationChangeHandler}
              placeholder="Enter Location"
            />
            <p> {this.state.errormessages.locationerrormsg}</p>
          </Form.Group>

          <p> {this.state.errormessages.accounterrormsg}</p>

          <Button onClick={this.signup} id="button" type="submit">
            Sign Up
          </Button>
        </Form>
      </div>
    );
  }
}

export default Signup;
