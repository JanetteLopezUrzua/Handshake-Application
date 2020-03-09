import React from 'react';
// import cookie from 'react-cookies';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MdEdit, MdLocationOn } from 'react-icons/md';
import { FaCalendar } from 'react-icons/fa';


const DisplayInfo = (props) => (
  <Card>
    <Row>
      <Col><Card.Title>Event Information</Card.Title></Col>
      <Col style={{ textAlign: "right" }}>
        <Button className="editbutton" onClick={props.clicked}>
          <MdEdit style={{ color: "black" }} />
        </Button>
      </Col>
    </Row>
    <Card.Text style={{ textTransform: "capitalize" }}>{ props.title }</Card.Text>
    <Card.Text style={{ textTransform: "capitalize" }}><FaCalendar style={{ color: "black" }} />
      { props.dayofweek }, {props.month} {props.day} {props.year}, {props.starttime}{props.startdaytime} - {props.endtime}{props.enddaytime} {props.timeozone}
    </Card.Text>
    <Card.Text style={{ textTransform: "capitalize" }}><MdLocationOn style={{ color: "black" }} />{ props.location }</Card.Text>
    <Card.Text style={{ textTransform: "capitalize" }}>Major: { props.eligibility }</Card.Text>
  </Card>
);

export default DisplayInfo;
