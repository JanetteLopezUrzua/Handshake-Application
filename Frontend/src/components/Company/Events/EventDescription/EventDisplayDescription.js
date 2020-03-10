import React from 'react';
import cookie from 'react-cookies';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MdEdit } from 'react-icons/md';

const EventDisplayDescription = (props) => {
  let button = "";

  if (cookie.load('id') === props.company_id && cookie.load('user') === "company") {
    button = (
      <Col style={{ textAlign: "right" }}>
        <Button className="editbutton" onClick={props.clicked}>
          <MdEdit style={{ color: "black" }} />
        </Button>
      </Col>
    );
  }

  let description = "";
  if (props.description === "") {
    description = "No Description Entered.";
  } else description = props.description;


  return (
    <Card>
      <Row>
        {button}
      </Row>
      <Card.Text
        style={{ fontSize: "14px", color: "black" }}
      >
        { description }
      </Card.Text>
    </Card>
  );
};

export default EventDisplayDescription;
