import React from 'react';
import cookie from 'react-cookies';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { MdEdit } from 'react-icons/md';

const DisplayWork = (props) => {
  let {
    companyname, title, startdatemonth, startdateyear, enddatemonth, enddateyear, description
  } = props.job;

  const wspatt = new RegExp("^ *$");

  if (companyname === null || companyname === "null" || wspatt.test(companyname)) {
    companyname = "";
  }
  if (title === null || title === "null" || wspatt.test(title)) {
    title = "";
  }
  if (startdatemonth === null || startdatemonth === "null" || wspatt.test(startdatemonth)) {
    startdatemonth = "";
  }
  if (startdateyear === null || startdateyear === "null" || wspatt.test(startdateyear)) {
    startdateyear = "";
  }
  if (enddatemonth === 0 || enddatemonth === null || enddatemonth === "null" || wspatt.test(enddatemonth)) {
    enddatemonth = "";
  }
  if (enddateyear === 0 || enddateyear === null || enddateyear === "null" || wspatt.test(enddateyear)) {
    enddateyear = "";
  }
  if (description === 0 || description === null || description === "null" || wspatt.test(description)) {
    description = "";
  }

  let noenddate = "";
  if (enddatemonth === "" || enddateyear === "") {
    noenddate = "Present";
    enddatemonth = "";
    enddateyear = "";
  } else noenddate = "";

  let container = "";
  if (cookie.load('id') === props.id && cookie.load('user') === "student") {
    container = (
      <Container
        onClick={props.clicked}
        style={{
          paddingRight: '0', paddingLeft: '10px', marginBottom: '30px', cursor: 'pointer'
        }}
      >
        <Row>
          <Col><Card.Title className="schoolname">{companyname}</Card.Title></Col>
          <Col style={{ textAlign: "right" }}>
            <Button className="editbutton" onClick={props.clicked}>
              <MdEdit style={{ color: "black" }} />
            </Button>
          </Col>
        </Row>
        <Card.Subtitle className="schooldegree">{title}</Card.Subtitle>
        <Card.Text className="schooldate">{ startdatemonth } {startdateyear} - {enddatemonth} {enddateyear} {noenddate}</Card.Text>
        <Card.Text className="schooldata">{ description }</Card.Text>
      </Container>
    );
  } else {
    container = (
      <Container
        style={{
          paddingRight: '0', paddingLeft: '10px', marginBottom: '30px'
        }}
      >
        <Row>
          <Col><Card.Title className="schoolname">{companyname}</Card.Title></Col>
        </Row>
        <Card.Subtitle className="schooldegree">{title}</Card.Subtitle>
        <Card.Text className="schooldate">{ startdatemonth } {startdateyear} - {enddatemonth} {enddateyear} {noenddate}</Card.Text>
        <Card.Text className="schooldata">{ description }</Card.Text>
      </Container>
    );
  }


  return (
    <div>
      { container }
    </div>
  );
};

export default DisplayWork;
