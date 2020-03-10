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
      fname: "",
      lname: "",
      email: "",
      password: "",
      college: "",
      errormessages: {}
    };
  }

  fnameChangeHandler = e => {
    this.setState({
      fname: e.target.value
    });
  };

  lnameChangeHandler = e => {
    this.setState({
      lname: e.target.value
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

    const data = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.password,
      college: this.state.college
    };

    let fnameerrormsg = "";
    let lnameerrormsg = "";
    let collegeerrormsg = "";
    let emailerrormsg = "";
    let passerrormsg = "";

    // Check that name and college inputs include letters only
    const lettpatt = new RegExp("^[a-zA-Z ]*$");
    const wspatt = new RegExp("^ *$");

    if (data.fname === "" || wspatt.test(data.fname)) {
      fnameerrormsg = "Required. Enter First Name.";
    } else if (!lettpatt.test(data.fname)) {
      fnameerrormsg = "First name can include letters only";
    }

    if (data.lname === "" || wspatt.test(data.lname)) {
      lnameerrormsg = "Required. Enter Last Name.";
    } else if (!lettpatt.test(data.lname)) {
      lnameerrormsg = "Last name can include letters only";
    }

    if (data.college === "" || wspatt.test(data.college)) {
      collegeerrormsg = "Required. Enter College Name.";
    } else if (!lettpatt.test(data.college)) {
      collegeerrormsg = "College name can include letters only";
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
      fnameerrormsg === ""
      && lnameerrormsg === ""
      && collegeerrormsg === ""
      && emailerrormsg === ""
      && passerrormsg === ""
    ) {
      axios.defaults.withCredentials = true;

      axios
        .post("http://localhost:3001/student/signup", data)
        .then(response => {
          console.log("Status Code : ", response.status);
          const data2 = {
            id: cookie.load('id'),
            schoolname: this.state.college,
            primaryschool: "true",
            location: "",
            degree: "",
            major: "",
            passingmonth: "",
            passingyear: 0,
            gpa: 0,
          };

          return axios.post("http://localhost:3001/student/educationinfo/newform", data2);
        }).then(response => {
          console.log(response);

          this.setState({
            errormessages: {
              accounterrormsg: "",
            }
          });
        }).catch(error => {
          console.log(error);
          this.setState({
            errormessages: {
              accounterrormsg: error.response.data
            }
          });
        });
    } else {
      this.setState({
        errormessages: {
          fnameerrormsg,
          lnameerrormsg,
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
    if (cookie.load('user') === "student") {
      redirectVar = <Redirect to={path} />;
    }

    return (
      <div>
        {redirectVar}
        <img id="banner" src={hsimage} alt="handshake banner" />
        <h2 className="pagetitle">Sign Up</h2>
        <Form id="signup-form">
          <Form.Group controlId="fName">
            <Form.Label className="labels">First Name</Form.Label>
            <Form.Control
              style={{ textTransform: "capitalize" }}
              onChange={this.fnameChangeHandler}
              placeholder="Enter First Name"
            />
            <p className="errormessage"> {this.state.errormessages.fnameerrormsg}</p>
          </Form.Group>

          <Form.Group controlId="lName">
            <Form.Label className="labels">Last Name</Form.Label>
            <Form.Control
              style={{ textTransform: "capitalize" }}
              onChange={this.lnameChangeHandler}
              placeholder="Enter Last Name"
            />
            <p className="errormessage"> {this.state.errormessages.lnameerrormsg}</p>
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

          <Form.Group controlId="CollegeName">
            <Form.Label className="labels">College Name</Form.Label>
            <Form.Control
              style={{ textTransform: "capitalize" }}
              onChange={this.collegeChangeHandler}
              placeholder="Enter College Name"
            />
            <p className="errormessage"> {this.state.errormessages.collegeerrormsg}</p>
          </Form.Group>

          <p className="errormessage"> {this.state.errormessages.accounterrormsg}</p>

          <Button onClick={this.signup} className="submitbutton" type="submit">
            Sign Up
          </Button>

          <Link className="signinlink" to="/student/signin">
              Already have an account? Sign In
          </Link>
        </Form>
      </div>
    );
  }
}

export default Signup;
