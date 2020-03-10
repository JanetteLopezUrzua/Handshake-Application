import React from 'react';
import "../../../components.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import { Redirect } from "react-router";
import cookie from "react-cookies";
import EventListContainer from "./EventListContainer";


class EventSearchPage extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
      message: "",
    };
  }

  componentDidMount() {
    this.getInfo("");
  }

  // componentDidUpdate(previousProps, previousState) {
  //   if (previousState.eventname !== this.state.eventname) {
  //     this.getInfo("");
  //   }
  // }

  getInfo = (en) => {
    console.log(en);
    let path = "";

    const wspatt = new RegExp("^ *$");
    const eventname = (wspatt.test(en) || en === "") ? "" : en;
    if (eventname === "") path = "all";
    if (eventname !== "") path = "eventname";


    const data = {
      eventname: en,
    };

    axios.post(`http://localhost:3001/student/events/${path}`, data)
      .then(response => {
        const info = response.data;

        this.setState({
          events: info.events,
        });
        console.log(info.events);

        if (this.state.events === undefined || this.state.events.length === 0) {
          this.setState({
            message: "No Events Found",
          });
        } else {
          this.setState({
            message: "",
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleEventName = (e) => {
    this.getInfo(e.target.value);
  };

  render() {
    // if not logged in go to login page
    let redirectVar = null;
    if (!cookie.load('id')) {
      redirectVar = <Redirect to="/" />;
    } else if (cookie.load('id') && cookie.load('user') === "company") {
      redirectVar = <Redirect to={`/company/${cookie.load('id')}`} />;
    }

    let eventsList = "";

    if (this.state.events === undefined || this.state.events.length === 0) eventsList = "";
    else eventsList = this.state.events.map((event) => <EventListContainer key={event.event_id} event={event} />);

    return (
      <div>
        {redirectVar}
        <Container>
          <Row>
            <Col sm={4}>
              <Card style={{ padding: "0" }}>
                <ListGroup variant="flush">
                  <ListGroup.Item className="studentslisttitle">
                    <Row>
                      <Col>
                       Search
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Card.Text className="studentslistsubtitle">Event Name</Card.Text>
                    <Form.Control onChange={this.handleEventName} name="name" type="search" value={this.state.eventname} />
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col sm={8}>
              <Container>
                {eventsList}
                <p className="errormessage">{this.state.message}</p>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default EventSearchPage;
