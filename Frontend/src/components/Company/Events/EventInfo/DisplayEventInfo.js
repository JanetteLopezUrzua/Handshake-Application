import React from 'react';
import cookie from 'react-cookies';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { MdEdit, MdLocationOn } from 'react-icons/md';
import { FaCalendar } from 'react-icons/fa';


const DisplayInfo = (props) => {
  let img = "";

  if (props.photo === "" || props.photo === null) {
    img = (
      <div>
        <div
          className="CompanyProfilePicNoImage"
        >
          <p style={{ lineHeight: "1" }}>{props.name.charAt(0)}</p>
        </div>
      </div>
    );
  } else {
    // const imageURL = `${Buffer.from(props.photo).toString()}`;
    img = (
      <Image
        className="CompanyProfilePicImage"
        src={`http://localhost:3001/resumesandimages/${props.photo}`}
      />
    );
  }

  let button = "";

  if (cookie.load('id') === props.company_id && cookie.load('user') === "company") {
    button = (
      <Col style={{ textAlign: "right" }}>
        <Button className="editbutton" onClick={props.clicked}>
          <MdEdit style={{ color: "black" }} />
        </Button>
      </Col>
    );
  }

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];

  return (
    <Card style={{ padding: "0" }}>
      <Row>
        <Col sm={2}>
          <Card style={{ height: "122px", width: "122px", padding: "0" }}>
            {img}
          </Card>
        </Col>
        <Col sm={10}>
          <Card.Body style={{ paddingBottom: "0" }}>
            <Card style={{
              border: "none", boxShadow: "none", fontSize: "14px", padding: "0", margin: "0"
            }}
            >
              <Row>
                <Col>
                  <Card.Title style={{
                    textTransform: "capitalize", margin: "0", color: "black", fontSize: "40", fontWeight: "bold", lineHeight: "none"
                  }}
                  >{ props.title }
                  </Card.Title>
                </Col>
                {button}
              </Row>
              <Card.Text style={{ margin: "0" }}><FaCalendar />
                { days[props.dayofweek - 1] }, {months[props.month - 1]} {props.day} {props.year}, {props.starttime} {(props.startdaytime).toLowerCase()} - {props.endtime} {(props.enddaytime).toLowerCase()} {props.timezone}
              </Card.Text>
              <Card.Text style={{ textTransform: "capitalize", margin: "0" }}><MdLocationOn />{ props.location }</Card.Text>
              <Card.Text style={{ textTransform: "capitalize", margin: "0" }}>Major: { props.eligibility }</Card.Text>
            </Card>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default DisplayInfo;
