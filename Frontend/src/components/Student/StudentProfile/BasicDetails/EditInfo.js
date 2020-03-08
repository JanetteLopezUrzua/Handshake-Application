import React from 'react';
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const EditInfo = (props) => (
  <Card>
    <Row>
      <Col><Card.Title>Personal Information</Card.Title></Col>
      <Col />
    </Row>
    <Form.Group controlId="fName">
      <Form.Label className="labels">First Name</Form.Label>
      <Form.Control style={{ textTransform: "capitalize" }} onChange={props.fnamechange} name="fname" type="text" value={props.data.fname} />
    </Form.Group>
    <Form.Group controlId="lName">
      <Form.Label className="labels">Last Name</Form.Label>
      <Form.Control style={{ textTransform: "capitalize" }} onChange={props.lnamechange} name="lname" type="text" value={props.data.lname} />
    </Form.Group>
    <Form.Group controlId="dob">
      <Form.Label className="labels">Date of Birth</Form.Label>
      <Form.Control onChange={props.dobchange} name="dob" type="date" value={props.data.dob} />
    </Form.Group>
    <Form.Group controlId="City">
      <Form.Label className="labels">City</Form.Label>
      <Form.Control style={{ textTransform: "capitalize" }} onChange={props.citychange} name="city" type="text" value={props.data.city} />
    </Form.Group>
    <Form.Group controlId="State">
      <Form.Label className="labels">State</Form.Label>
      <Form.Control style={{ textTransform: "capitalize" }} onChange={props.statechange} name="state" type="text" vlaue={props.data.state} />
    </Form.Group>
    <Form.Group controlId="Country">
      <Form.Label className="labels">Country</Form.Label>
      <Form.Control style={{ textTransform: "capitalize" }} onChange={props.countrychange} name="country" type="text" value={props.data.country} />
    </Form.Group>
    <Card.Footer>
      <Button className="cancel" onClick={props.cancel}>Cancel</Button>
      <Button className="save" onClick={props.save}>Save</Button>
    </Card.Footer>
  </Card>
);
export default EditInfo;
