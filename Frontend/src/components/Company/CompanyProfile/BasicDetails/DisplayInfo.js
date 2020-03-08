import React from 'react';
import cookie from 'react-cookies';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MdEdit } from 'react-icons/md';

const DisplayInfo = (props) => {
  const location = (props.location === "") ? "No Location Entered" : props.location;
  const description = (props.description === "") ? "No Description Entered" : props.description;

  let button = "";
  if (cookie.load('id') === props.id && cookie.load('user') === "company") {
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
        <Col><Card.Title>Company Information</Card.Title></Col>
        {button}
      </Row>
      <Card.Subtitle>Location</Card.Subtitle>
      <Card.Text style={{ textTransform: "capitalize" }}>{ location }</Card.Text>
      <Card.Subtitle>Description</Card.Subtitle>
      <Card.Text>{ description }</Card.Text>
    </Card>
  );
};

export default DisplayInfo;
