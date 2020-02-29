import React from 'react';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MdEdit } from 'react-icons/md';

const DisplayContactInfo = (props) => {
  const email = (props.email === "") ? "No Email Entered" : props.email;
  const phonenum = (props.phonenum === "") ? "No Phone Number Registered" : props.phonenum;

  return (
    <Card>
      <Row>
        <Col><Card.Title>Contact Information</Card.Title></Col>
        <Col style={{ textAlign: "right" }}>
          <Button className="editbutton" onClick={props.clicked}>
            <MdEdit style={{ color: "black" }} />
          </Button>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <Card.Subtitle>Email</Card.Subtitle>
          <Card.Text>{ email }</Card.Text>
        </Col>
        <Col sm={6}>
          <Card.Subtitle>Phone Number</Card.Subtitle>
          <Card.Text>{ phonenum }</Card.Text>
        </Col>
      </Row>
    </Card>
  );
};

export default DisplayContactInfo;
