import React from "react";
import axios from "axios";
// import cookie from 'react-cookies';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import RSVPModal from "./RSVPModal";

class ContactInformation extends React.Component {
  constructor() {
    super();

    this.state = {
      event_id: "",
      show: false,
      students: [],
    };
  }

  static getDerivedStateFromProps = (props) => ({ event_id: props.event_id })

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    axios.get(`http://localhost:3001/event/RSVP/${this.state.event_id}`)
      .then(response => {
        const info = response.data;

        this.setState({
          students: info.students
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleClose = () => {
    // eslint-disable-next-line implicit-arrow-linebreak
    this.setState({
      show: false,
    });
  };

  handleShow = () =>
    // eslint-disable-next-line implicit-arrow-linebreak
    this.setState({
      show: true
    });

  render() {
    let message = "";
    let button = "";
    if (this.state.students.length === 0) {
      message = "No one has registered for this event.";
      button = (
        <Button style={{ cursor: "not-allowed" }} disabled>View RSVP List</Button>
      );
    } else {
      message = "";
      button = (
        <Button onClick={this.handleShow}>View RSVP List</Button>
      );
    }

    return (
      <Card>
        <RSVPModal
          show={this.state.show}
          close={this.handleClose}
          students={this.state.students}
        />
        {message}
        {button}
      </Card>
    );
  }
}

export default ContactInformation;
