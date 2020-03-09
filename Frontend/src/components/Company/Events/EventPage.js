import React from 'react';
import "../../components.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
import { Redirect } from "react-router";
import cookie from "react-cookies";
import { Link } from 'react-router-dom';
import EventListContainer from "./EventListContainer/EventListContainer";


class EventPage extends React.Component {
  constructor() {
    super();
    this.state = {
      company_id: cookie.load("id"),
      events: [],
      message: "",
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    axios.get(`http://localhost:3001/company/events/${this.state.company_id}`)
      .then(response => {
        const info = response.data;

        this.setState({
          events: info.events,
        });

        if (this.state.events === undefined || this.state.events.length === 0) {
          this.setState({
            message: "You Have 0 Events.",
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

  render() {
    // if not logged in go to login page
    let redirectVar = null;
    if (!cookie.load('id')) {
      redirectVar = <Redirect to="/" />;
    }

    let eventsList = "";

    if (this.state.events === undefined || this.state.events.length === 0) eventsList = "";
    else eventsList = this.state.events.map((event) => <EventListContainer key={event.event_id} event={event} />);

    return (
      <Container style={{ width: "60%" }}>
        {redirectVar}
        <Link style={{ margin: "15px", display: "block" }} to="/company/events/new">Create New Event</Link>
        <p className="errormessage">{this.state.message}</p>
        {eventsList}
      </Container>
    );
  }
}

export default EventPage;
