import React from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from 'react-router-dom';

const DisplayStudent = (props) => {
  const path = `student/${props.student.id}`;
  let img = "";

  if (props.student.photo === "" || props.student.photo === null) {
    img = (
      <div>
        <p
          className="studentslistpics"
        >
          <div style={{ paddingTop: "10px" }}>{props.student.fname.charAt(0)}{props.student.lname.charAt(0)}</div>
        </p>
      </div>
    );
  } else {
    const imageURL = `${Buffer.from(props.student.photo).toString()}`;
    img = (
      <Image
        className="studentslistpics"
        src={imageURL}
        roundedcircle
      />
    );
  }

  const degree = (props.student.degree === "" || props.student.degree === null) ? "No Degree Listed" : props.student.degree;
  const passingdate = (props.student.passingmonth === "" || props.student.passingmonth === null || props.student.passingyear === 0 || props.student.passingyear === null) ? "No Passing Date Listed" : `${props.student.passingmonth} ${props.student.passingyear}`;
  const major = (props.student.major === "" || props.student.major === null) ? "No Major Listed" : props.student.major;

  return (
    <Card style={{ padding: "16px" }}>
      <Row>
        <Col sm={2}>
          {img}
        </Col>
        <Col sm={5} style={{ paddingLeft: "0" }}>
          <Card.Title className="studentslistname">{props.student.name}</Card.Title>
          <Card.Title className="studentslistcollege">{props.student.college}</Card.Title>
          <Card.Title className="studentslistinfo">{degree}</Card.Title>
          <Card.Title className="studentslistinfo">{passingdate}</Card.Title>
        </Col>
        <Col sm={5} style={{ paddingTop: "38px" }}>
          <Card.Title className="studentslistinfo">{major}
          </Card.Title>
          <Link
            to={path}
            className="studentslistinfo"
            style={{ color: "#1569e0" }}
          >
              Student Details
          </Link>
        </Col>
      </Row>
    </Card>
  );
};

export default DisplayStudent;
