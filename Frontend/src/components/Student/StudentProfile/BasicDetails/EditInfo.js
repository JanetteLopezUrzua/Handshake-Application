import React from 'react';
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const EditInfo = (props) => {
  const nameholder = (props.data.name === "") ? "Enter Name" : props.data.name;
  const dobholder = (props.data.dob === "") ? "Enter Data of Birth" : props.data.dob;
  const cityholder = (props.data.city === "") ? "Enter City" : props.data.city;
  const stateholder = (props.data.state === "") ? "Enter State" : props.data.state;
  const countryholder = (props.data.country === "") ? "Enter Country" : props.data.country;

  return (
    <Card>
      <Row>
        <Col><Card.Title>Personal Information</Card.Title></Col>
        <Col />
      </Row>
      <Form.Group controlId="Name">
        <Form.Label className="labels">Name</Form.Label>
        <Form.Control style={{ textTransform: "capitalize" }} onChange={props.namechange} name="name" type="text" placeholder={nameholder} />
      </Form.Group>
      <Form.Group controlId="dob">
        <Form.Label className="labels">Date of Birth</Form.Label>
        <Form.Control onChange={props.dobchange} name="dob" type="date" placeholder={dobholder} />
      </Form.Group>
      <Form.Group controlId="City">
        <Form.Label className="labels">City</Form.Label>
        <Form.Control style={{ textTransform: "capitalize" }} onChange={props.citychange} name="city" type="text" placeholder={cityholder} />
      </Form.Group>
      <Form.Group controlId="State">
        <Form.Label className="labels">State</Form.Label>
        <Form.Control style={{ textTransform: "capitalize" }} onChange={props.statechange} name="state" type="text" placeholder={stateholder} />
      </Form.Group>
      <Form.Group controlId="Country">
        <Form.Label className="labels">Country</Form.Label>
        <Form.Control style={{ textTransform: "capitalize" }} onChange={props.countrychange} name="country" type="text" placeholder={countryholder} />
      </Form.Group>
      <Card.Footer>
        <Button className="cancel" onClick={props.cancel}>Cancel</Button>
        <Button className="save" onClick={props.save}>Save</Button>
      </Card.Footer>
    </Card>
  );
};

export default EditInfo;
