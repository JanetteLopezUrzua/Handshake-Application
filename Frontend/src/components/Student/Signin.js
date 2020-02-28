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
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errormessages: {}
    };
  }

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

  signin = e => {
    e.preventDefault();
    // cookie.remove('id', { path: '/' });

    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    let emailerrormsg = "";
    let passerrormsg = "";

    // Check that email input is valid
    if (data.email === "") {
      emailerrormsg = "Required. Enter Email.";
    }

    // password is at least 8 characters and 1 number
    if (data.password === "") {
      passerrormsg = "Required. Enter Password.";
    }

    if (data.email !== "" && data.password !== "") {
      axios.defaults.withCredentials = true;
      axios
        .post("http://localhost:3001/student/signin", data)
        .then(response => {
          console.log("Status Code : ", response.status);
          this.setState({
            errormessages: {},
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
          emailerrormsg,
          passerrormsg,
        }
      });
    }
  };

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
        <h2>Sign In</h2>
        <Form id="signup-form">
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

          <p> {this.state.errormessages.accounterrormsg}</p>

          <Button onClick={this.signin} id="button" type="submit">
            Sign In
          </Button>

          <Link to="/student/signup">
            <div>
              Dont have an account? Sign Up
            </div>
          </Link>
        </Form>
      </div>
    );
  }
}

export default Signup;
