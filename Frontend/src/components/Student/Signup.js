import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import "../components.css";
import hsimage from "../../assets/handshake.png";


class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      college: "",
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

  collegeChangeHandler = e => {
    this.setState({
      college: e.target.value
    });
  };

  signup = e => {
    e.preventDefault();
    // cookie.remove('id', { path: '/' });

    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      college: this.state.college
    };

    let nameerrormsg = "";
    let collegeerrormsg = "";
    let emailerrormsg = "";
    let passerrormsg = "";

    // Check that name and college inputs include letters only
    const lettpatt = new RegExp("^[a-zA-Z ]*$");

    if (data.name === "") {
      nameerrormsg = "Required. Enter Name.";
    } else if (!lettpatt.test(data.name)) {
      nameerrormsg = "Name can include letters only";
    }

    if (data.college === "") {
      collegeerrormsg = "Required. Enter College Name.";
    } else if (!lettpatt.test(data.college)) {
      collegeerrormsg = "College name can include letters only";
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
      && collegeerrormsg === ""
      && emailerrormsg === ""
      && passerrormsg === ""
    ) {
      axios.defaults.withCredentials = true;

      axios
        .post("http://localhost:3001/student/signup", data)
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
          collegeerrormsg,
        }
      });
    }
  };

  render() {
    // if sign up then redirecto the student profile
    let redirectVar = null;
    const path = `/student/${cookie.load('id')}`;
    if (cookie.load('id')) {
      redirectVar = <Redirect to={path} />;
    }

    return (
      <div>
        {redirectVar}
        <img id="banner" src={hsimage} alt="handshake banner" />
        <h2>Sign Up</h2>
        <Form id="signup-form">
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={this.nameChangeHandler}
              placeholder="Enter Name"
            />
            <p> {this.state.errormessages.nameerrormsg}</p>
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="Email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={this.emailChangeHandler}
                type="email"
                placeholder="Enter email"
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

          <Form.Group controlId="CollegeName">
            <Form.Label>College Name</Form.Label>
            <Form.Control
              onChange={this.collegeChangeHandler}
              placeholder="Enter College Name"
            />
            <p> {this.state.errormessages.collegeerrormsg}</p>
          </Form.Group>

          <p> {this.state.errormessages.accounterrormsg}</p>

          <Button onClick={this.signup} id="button" type="submit">
            Sign Up
          </Button>

          <Link to="/student/signin">
            <div>
              Already have an account? Sign In
            </div>
          </Link>
        </Form>
      </div>
    );
  }
}

export default Signup;
