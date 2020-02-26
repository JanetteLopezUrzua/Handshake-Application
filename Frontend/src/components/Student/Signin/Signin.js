import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import '../Signup/Signup.css';
import hsimage from '../../../assets/handshake.png';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <img id="logo" src={hsimage} alt="handshake logo" />
        <h2>Sign In</h2>
        <Form id="signup-form">
          <Form.Group as={Col} controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group as={Col} controlId="Password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button id="button" type="submit">
          Sign In
          </Button>
        </Form>
      </div>
    );
  }
}

export default Signup;
