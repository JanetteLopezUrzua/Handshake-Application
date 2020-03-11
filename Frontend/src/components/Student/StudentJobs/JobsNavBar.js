import React from 'react';
import "../../components.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import { Link } from 'react-router-dom';


const JobsNavBar = () => (
  <Card className="studentslistbarcard">
    <Container>
      <Row>
        <Col sm={4}>
          <Card.Title className="studentslistbar"><h2>Jobs</h2></Card.Title>
        </Col>
        <Nav className="ml-auto">
          <Link className="eventsnavbaritem" to="/student/jobs/search"><span>Job Search</span></Link>
          <Link className="eventsnavbaritem" to="/student/jobs/applications"><span>Applications</span></Link>
        </Nav>
      </Row>
    </Container>
  </Card>
);

export default JobsNavBar;
