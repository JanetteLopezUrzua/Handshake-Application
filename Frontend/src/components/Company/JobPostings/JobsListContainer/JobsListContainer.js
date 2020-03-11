import React from 'react';
// import cookie from 'react-cookies';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MdLocationOn } from 'react-icons/md';
import { FaCalendar } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const JobsListContainer = (props) => {
  const path = `/job/${props.job.job_id}`;

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];

  return (
    <Card style={{ padding: "16px" }}>
      <Row>
        <Col sm={5}>
          <Card.Title className="studentslistname"><Link to={path} style={{ color: "black" }}> {props.job.title} </Link></Card.Title>
          <Card.Title className="studentslistcollege" style={{ textTransform: "none" }}><FaCalendar style={{ color: "black" }} />
            Deadline: {months[props.job.deadlinemonth - 1]} {props.job.deadlineday}, {props.job.deadlineyear}
          </Card.Title>
          <Card.Title className="studentslistinfo"><MdLocationOn style={{ color: "black" }} />{props.job.location}</Card.Title>
        </Col>
        <Col sm={5} style={{ marginTop: "22px" }}>
          <Card.Title className="studentslistinfo"> Salary: {props.job.salary} per {props.job.salarytime}</Card.Title>
          <Card.Title className="studentslistinfo"> Category: {props.job.category}</Card.Title>
        </Col>
        <Col sm={2} style={{ paddingTop: "38px", textAlign: "right" }}>
          <Link
            to={path}
            className="studentslistinfo"
            style={{ color: "#1569e0" }}
          >
              View Details
          </Link>
        </Col>
      </Row>
    </Card>
  );
};

export default JobsListContainer;
