import React from 'react';
import cookie from 'react-cookies';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MdEdit } from 'react-icons/md';

const DisplayInfo = (props) => {
  const fname = (props.fname === "") ? "No First Name Entered" : props.fname;
  const lname = (props.lname === "") ? "No Last Name Entered" : props.lname;
  const dob = (props.dob === "") ? "No Date of Birth Entered" : props.dob;
  const city = (props.city === "") ? "No City Entered" : props.city;
  const state = (props.state === "") ? "No State Entered" : props.state;
  const country = (props.country === "") ? "No Country Entered" : props.country;

  let button = "";
  if (cookie.load('id') === props.id && cookie.load('user') === "student") {
    button = (
      <Col style={{ textAlign: "right" }}>
        <Button className="editbutton" onClick={props.clicked}>
          <MdEdit style={{ color: "black" }} />
        </Button>
      </Col>
    );
  }

  return (
    <Card>
      <Row>
        <Col><Card.Title>Personal Information</Card.Title></Col>
        {button}
      </Row>
      <Card.Subtitle>First Name</Card.Subtitle>
      <Card.Text style={{ textTransform: "capitalize" }}>{ fname }</Card.Text>
      <Card.Subtitle>Last Name</Card.Subtitle>
      <Card.Text style={{ textTransform: "capitalize" }}>{ lname }</Card.Text>
      <Card.Subtitle>Date of Birth</Card.Subtitle>
      <Card.Text>{ dob }</Card.Text>
      <Card.Subtitle>City</Card.Subtitle>
      <Card.Text style={{ textTransform: "capitalize" }}>{ city }</Card.Text>
      <Card.Subtitle>State</Card.Subtitle>
      <Card.Text style={{ textTransform: "capitalize" }}>{ state }</Card.Text>
      <Card.Subtitle>Country</Card.Subtitle>
      <Card.Text style={{ textTransform: "capitalize" }}>{ country }</Card.Text>
    </Card>
  );
};

export default DisplayInfo;
