import React from 'react';
import "../../../components.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { FaRegMoneyBillAlt, FaRegClock, FaBriefcase } from 'react-icons/fa';
import Application from '../Application/Application';

const JobDescriptionDisplay = (props) => {
  const path = `/company/${props.job.company_id}`;
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
  return (
    <div>
      <Card.Body style={{ paddingBottom: "0" }}>
        <Row>
          <Card.Title style={{
            textTransform: "capitalize", margin: "0", color: "black", fontSize: "20px", fontWeight: "bold", lineHeight: "none"
          }}
          >{ props.job.title }
          </Card.Title>
        </Row>
        <Card.Title><Link to={path} style={{ color: "black", fontSize: "16px" }}>{props.job.company_name}</Link></Card.Title>
        <Row>
          <Card.Text style={{ marginRight: "5px", marginLeft: "5px", fontSize: "14px" }}><FaBriefcase /> {props.job.category} </Card.Text>
          <Card.Text style={{ marginRight: "5px", marginLeft: "5px", fontSize: "14px" }}><MdLocationOn /> {props.job.location} </Card.Text>
          <Card.Text style={{ marginRight: "5px", marginLeft: "5px", fontSize: "14px" }}><FaRegMoneyBillAlt /> {`$${props.job.salary}`} per {props.job.salarytime} </Card.Text>
          <Card.Text style={{ marginRight: "5px", marginLeft: "5px", fontSize: "14px" }}><FaRegClock /> Posted {props.job.postingdate} </Card.Text>
        </Row>
        <Card style={{ boxShadow: "none", marginLeft: "0", marginRight: "0" }}>
          <Row>
            <Col sm={10}>
              <Card.Title style={{ fontSize: "16px" }}>Applications close on {months[props.job.deadlinemonth - 1]} {props.job.deadlineday}, {props.job.deadlineyear} at {props.job.deadlinetime} {(props.job.deadlinedaytime).toLowerCase()}</Card.Title>
            </Col>
            <Col sm={2}>
              <Application job_id={props.job.job_id} />
            </Col>
          </Row>
        </Card>
        <Card.Title style={{ fontSize: "14px" }}>{props.job.description}</Card.Title>
      </Card.Body>
    </div>
  );
};

export default JobDescriptionDisplay;
