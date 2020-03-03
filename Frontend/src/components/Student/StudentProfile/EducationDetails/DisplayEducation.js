import React from 'react';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { MdEdit } from 'react-icons/md';

const DisplayEducation = (props) => {
  let {
    schoolname, location, degree, major, passingmonth, passingyear, gpa
  } = props.school;

  const wspatt = new RegExp("^ *$");

  if (schoolname === null || schoolname === "null" || wspatt.test(schoolname)) {
    schoolname = "";
  }
  if (location === null || location === "null" || wspatt.test(location)) {
    location = "";
  }
  if (degree === null || degree === "null" || wspatt.test(degree)) {
    degree = "";
  }
  if (major === null || major === "null" || wspatt.test(major)) {
    major = "";
  }
  if (passingmonth === 0 || passingmonth === null || passingmonth === "null" || wspatt.test(passingmonth)) {
    passingmonth = "";
  }
  if (passingyear === 0 || passingyear === null || passingyear === "null" || wspatt.test(passingyear)) {
    passingyear = "";
  }
  if (gpa === 0 || gpa === null || gpa === "null" || wspatt.test(gpa)) {
    gpa = "";
  }

  let majordisplay = "";
  if (major !== "") majordisplay = "Major:";
  else majordisplay = "";

  let gpadisplay = "";
  if (gpa !== "") gpadisplay = "Cumulative GPA:";
  else gpadisplay = "";

  let locationdisplay = "";
  if (location !== "") locationdisplay = "Location:";
  else locationdisplay = "";


  return (
    <Container
      onClick={props.clicked}
      style={{
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
      <Card.Text className="schooldata"><span style={{ fontWeight: "bold" }}>{majordisplay}</span> { major }</Card.Text>
      <Card.Text className="schooldata"><span style={{ fontWeight: "bold" }}>{gpadisplay}</span> { gpa }</Card.Text>
      <Card.Text className="schooldata"><span style={{ fontWeight: "bold" }}>{locationdisplay}</span> { location }</Card.Text>
    </Container>
  );
};

export default DisplayEducation;
