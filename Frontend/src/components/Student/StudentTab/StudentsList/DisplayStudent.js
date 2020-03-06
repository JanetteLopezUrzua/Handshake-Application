import React from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from 'react-router-dom';
import { MdWork } from "react-icons/md";

const DisplayStudent = (props) => {
  const path = `student/${props.student.id}`;
  let img = "";

  if (props.student.photo === "" || props.student.photo === null) {
    img = (
      <div>
        <p
          className="studentslistpics"
        >
          {props.student.fname.charAt(0)} {props.student.lname.chartAt(0)}
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

  const degree = (props.student.degree !== "" || props.student.degree !== null) ? props.student.degree : "No Degree Listed";
  const passingdate = (props.student.passingmonth !== "" || props.student.passingmonth !== null || props.student.passingyear !== "" || props.student.passingyear !== null) ? `${props.student.passingmonth} ${props.student.passingyear}` : "No Passing Date Listed";
  const title = (props.student.title !== "" || props.student.title !== null) ? props.student.title : "No Title Listed";
  const companyname = (props.student.companyname !== "" || props.student.companyname !== null) ? ` at ${props.student.companyname}` : "  at No Company Listed Listed";
  const major = (props.student.major !== "" || props.student.major !== null) ? props.student.major : "No Major Listed";

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
          <Row>
            <MdWork style={{
              color: "rgba(0,0,0,.8)", fontSize: "13px", marginLeft: "15px", marginTop: "3px"
            }}
            />
            <Card.Title className="studentslistinfo" style={{ paddingLeft: "5px" }}>{title}{companyname}</Card.Title>
          </Row>
        </Col>
        <Col sm={5} style={{ paddingTop: "57px" }}>
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
