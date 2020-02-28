import React from 'react';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MdEdit } from 'react-icons/md';

const DisplayObjective = (props) => (
  <Card>
    <Row>
      <Col><Card.Title>My Journey</Card.Title></Col>
      <Col style={{ textAlign: "right" }}>
        <Button className="editbutton" onClick={props.clicked}>
          <MdEdit style={{ color: "black" }} />
        </Button>
      </Col>
    </Row>
    <Card.Subtitle></Card.Subtitle>
    <Card.Text>{ props.objective }</Card.Text>
  </Card>
);

export default DisplayObjective;
