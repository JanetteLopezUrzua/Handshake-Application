import React from 'react';
import "../../../components.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { Redirect } from "react-router";
import cookie from "react-cookies";
import EventListContainer from "./EventListContainer";


class UpcomingEventsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
      message: "",
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    axios.get(`http://localhost:3001/student/events`)
      .then(response => {
        const info = response.data;

        this.setState({
          events: info.events,
        });

        if (this.state.events === undefined || this.state.events.length === 0) {
          this.setState({
            message: "No Events Found.",
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
    console.log(this.events);
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
      <Container style={{ width: "60%" }}>
        {redirectVar}
        <p className="errormessage">{this.state.message}</p>
        {eventsList}
      </Container>
    );
  }
}

export default UpcomingEventsPage;
