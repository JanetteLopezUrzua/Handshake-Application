import React from 'react';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MdEdit } from 'react-icons/md';

const DisplayObjective = (props) => {
  const obj = (props.objective === undefined || props.objective === "") ? "Enter a career objective..." : props.objective;
  return (
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
      <Card.Text style={{ fontSize: "24px", lineHeight: "32px", color: "black" }} onClick={props.clicked}>{ obj }</Card.Text>
    </Card>
  );
};

export default DisplayObjective;
