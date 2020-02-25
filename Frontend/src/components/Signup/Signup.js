import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import './Signup.css';
import hsimage from '../../assets/handshake.png';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <img id="logo" src={hsimage} alt="handshake logo" />
        <h2>Sign Up</h2>
        <Form id="signup-form">
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Enter Name" />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="Email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group as={Col} controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="CollegeName">
            <Form.Label>College Name</Form.Label>
            <Form.Control placeholder="Enter College Name" />
          </Form.Group>

          <Button id="button" type="submit">
          Sign Up
          </Button>
        </Form>
      </div>
    );
  }
}

export default Signup;
