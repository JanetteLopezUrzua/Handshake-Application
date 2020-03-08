import React from 'react';
import cookie from 'react-cookies';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { MdEdit } from 'react-icons/md';

const DisplayEducation = (props) => {
  let {
    // eslint-disable-next-line prefer-const
    schoolname, primaryschool, location, degree, major, passingmonth, passingyear, gpa
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

  let primarydisplay = "";
  if (primaryschool === "true") {
    primarydisplay = (
      <p style={{
        backgroundColor: "#bbb", color: "white", display: "inline", padding: "2px", borderRadius: "5px", fontSize: "10px"
      }}
      >Primary School
      </p>
    );
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
          <Col sm={10}><Card.Title className="schoolname">{schoolname}  {primarydisplay}</Card.Title></Col>
          <Col sm={2} style={{ textAlign: "right" }}>
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
  } else {
    container = (
      <Container
        style={{
          paddingRight: '0', paddingLeft: '10px', marginBottom: '30px'
        }}
      >
        <Row>
          <Col><Card.Title className="schoolname">{schoolname}</Card.Title></Col>
        </Row>
        <Card.Subtitle className="schooldegree">{degree}</Card.Subtitle>
        <Card.Text className="schooldate">{ passingmonth } {passingyear}</Card.Text>
        <Card.Text className="schooldata"><span style={{ fontWeight: "bold" }}>{majordisplay}</span> { major }</Card.Text>
        <Card.Text className="schooldata"><span style={{ fontWeight: "bold" }}>{gpadisplay}</span> { gpa }</Card.Text>
        <Card.Text className="schooldata"><span style={{ fontWeight: "bold" }}>{locationdisplay}</span> { location }</Card.Text>
      </Container>
    );
  }

  return (
    <div>
      { container }
    </div>
  );
};

export default DisplayEducation;
