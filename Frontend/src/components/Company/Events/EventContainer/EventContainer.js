import React from 'react';
import "../../../components.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router";
import axios from "axios";
import cookie from "react-cookies";
import Banner from "../Banner/DisplayBanner";
import EventInfo from "../EventInfo/EventInfo";
import EventDescription from "../EventDescription/EventDescription";

class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  handleDelete=() => {
    axios.delete("http://localhost:3001/company/event/delete", { data: { event_id: this.props.match.params.event_id } })
      .then(response => {
        console.log(response);
        this.setState({
          redirect: true,
        });
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

    if (this.state.redirect === true) {
      redirectVar = <Redirect to="/company/events" />;
    }

    return (
      <Container>
        {redirectVar}
        <Banner event_id={this.props.match.params.event_id} />
        <EventInfo event_id={this.props.match.params.event_id} />
        <EventDescription event_id={this.props.match.params.event_id} />
        <Button className="delete" style={{ margin: "15px" }} onClick={this.handleDelete}>Delete Event</Button>
      </Container>
    );
  }
}

export default EventPage;
