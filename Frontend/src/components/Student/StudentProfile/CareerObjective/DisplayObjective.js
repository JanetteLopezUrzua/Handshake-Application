import React from 'react';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { MdEdit } from 'react-icons/md';

const DisplayObjective = (props) => {
  const obj = (props.objective === undefined || props.objective === "") ? <Form.Label style={{ color: "blue", cursor: 'pointer' }} onClick={props.clicked}>Enter a career objective...</Form.Label> : (
    <Card.Text
      style={{
        fontSize: "24px", lineHeight: "32px", color: "black", cursor: "pointer"
      }}
      onClick={props.clicked}
    >{ props.objective }
    </Card.Text>
  );
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
      { obj }
    </Card>
  );
};

export default DisplayObjective;
