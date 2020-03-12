import React from 'react';
// import cookie from 'react-cookies';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { MdLocationOn } from 'react-icons/md';
import { FaCalendar } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const EventListContainer = (props) => {
  const path = `/event/${props.event.event_id}`;
  let img = "";

  if (props.event.photo === "" || props.event.photo === null) {
    img = (
      <div style={{ paddingLeft: "40px" }}>
        <div
          className="eventslistpics"
        >
          <p style={{ paddingTop: "10px" }}>{props.event.name.charAt(0)}</p>
        </div>
      </div>
    );
  } else {
    img = (
      <Image
        className="eventslistpics"
        src={`http://localhost:3001/resumesandimages/${props.event.photo}`}
      />
    );
  }

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
  const month = (months[props.event.month - 1]).charAt(0).toUpperCase() + (months[props.event.month - 1]).slice(1);

  return (
    <Card style={{ padding: "16px" }}>
      <Row>
        <Col sm={2} style={{ paddingRight: "0", paddingLeft: "0", textAlign: "center" }}>
          {img}
        </Col>
        <Col sm={5} style={{ paddingLeft: "0" }}>
          <Card.Title className="studentslistname"><Link to={path} style={{ color: "black" }}>{props.event.title}</Link></Card.Title>
          <Card.Title className="studentslistcollege" style={{ textTransform: "none" }}><FaCalendar style={{ color: "black" }} />
            {month} {props.event.day}, {props.event.year} from {props.event.starttime} {(props.event.startdaytime).toLowerCase()} to {props.event.endtime} {(props.event.enddaytime).toLowerCase()}
          </Card.Title>
          <Card.Title className="studentslistinfo"><MdLocationOn style={{ color: "black" }} />{props.event.location}</Card.Title>
        </Col>
        <Col sm={5} style={{ paddingTop: "38px", textAlign: "right" }}>
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

export default EventListContainer;
