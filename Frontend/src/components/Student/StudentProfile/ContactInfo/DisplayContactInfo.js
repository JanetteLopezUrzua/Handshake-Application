import React from 'react';
import cookie from 'react-cookies';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MdEdit } from 'react-icons/md';

const DisplayContactInfo = (props) => {
  const email = (props.email === "") ? "No Email Entered" : props.email;
  const phonenum = (props.phonenum === "") ? "No Phone Number Registered" : `(${props.phonenum.substring(0, 3)})${props.phonenum.substring(3, 6)}-${props.phonenum.substring(6)}`;

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
        <Col><Card.Title>Contact Information</Card.Title></Col>
        {button}
      </Row>
      <Row>
        <Col sm={6}>
          <Card.Subtitle>Email</Card.Subtitle>
          <Card.Text>{ email }</Card.Text>
        </Col>
        <Col sm={6}>
          <Card.Subtitle>Phone Number</Card.Subtitle>
          <Card.Text>{phonenum}</Card.Text>
        </Col>
      </Row>
    </Card>
  );
};

export default DisplayContactInfo;
