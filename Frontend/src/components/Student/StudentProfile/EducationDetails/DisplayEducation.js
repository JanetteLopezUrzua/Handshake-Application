import React from 'react';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { MdEdit } from 'react-icons/md';

const DisplayEducation = (props) => {
  const {
    schoolname, location, degree, major, passingmonth, passingyear, gpa
  } = props.school;

  return (
    <Container style={{
      paddingRight: '0', paddingLeft: '10px', marginBottom: '30px', cursor: 'pointer'
    }}
    >
      <Row>
        <Col><Card.Title className="schoolname">{schoolname}</Card.Title></Col>
        <Col style={{ textAlign: "right" }}>
          <Button className="editbutton" onClick={props.clicked}>
            <MdEdit style={{ color: "black" }} />
          </Button>
        </Col>
      </Row>
      <Card.Subtitle className="schooldegree">{degree}</Card.Subtitle>
      <Card.Text className="schooldate">{ passingmonth } {passingyear}</Card.Text>
      <Card.Text className="schooldata"><span style={{ fontWeight: "bold" }}>Major:</span> { major }</Card.Text>
      <Card.Text className="schooldata"><span style={{ fontWeight: "bold" }}>Cumulative GPA:</span> { gpa }</Card.Text>
      <Card.Text className="schooldata"><span style={{ fontWeight: "bold" }}>Location:</span> { location }</Card.Text>
    </Container>
  );
};

export default DisplayEducation;
