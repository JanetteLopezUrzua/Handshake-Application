import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const EditInfo = (props) => (
  <Form style={{ width: '18rem' }}>
    <h2>Personal Information</h2>
    <Form.Group controlId="Name">
      <Form.Label>Name</Form.Label>
      <Form.Control onChange={props.namechange} name="name" type="text" placeholder={props.data.name} />
    </Form.Group>
    <Form.Group controlId="dob">
      <Form.Label>Date of Birth</Form.Label>
      <Form.Control onChange={props.dobchange} name="dob" type="date" placeholder={props.data.dob} />
    </Form.Group>
    <Form.Group controlId="City">
      <Form.Label>City</Form.Label>
      <Form.Control onChange={props.citychange} name="city" type="text" placeholder={props.data.city} />
    </Form.Group>
    <Form.Group controlId="State">
      <Form.Label>State</Form.Label>
      <Form.Control onChange={props.statechange} name="state" type="text" placeholder={props.data.state} />
    </Form.Group>
    <Form.Group controlId="Country">
      <Form.Label>Country</Form.Label>
      <Form.Control onChange={props.countrychange} name="country" type="text" placeholder={props.data.country} />
    </Form.Group>
    <Button onClick={props.cancel}>Cancel</Button>
    <Button onClick={props.save}>Save</Button>
  </Form>
);

export default EditInfo;
