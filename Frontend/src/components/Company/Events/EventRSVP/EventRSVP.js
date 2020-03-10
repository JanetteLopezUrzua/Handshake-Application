import React from "react";
import axios from "axios";
import cookie from "react-cookies";
import { FaPlus } from 'react-icons/fa';
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
      message: ""
    };
  }

  static getDerivedStateFromProps = (props) => ({ event_id: props.event_id })

  componentDidMount() {
    this.getInfo();
  }

  // componentDidUpdate(props) {
  //   if (this.props !== props) {
  //     this.getInfo();
  //   }
  // }

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

  handleShow = () => {
    // eslint-disable-next-line implicit-arrow-linebreak
    this.setState({
      show: true
    });
  };

  handleRSVP = () => {
    const data = {
      student_id: cookie.load('id'),
      event_id: this.state.event_id,
    };

    axios.post("http://localhost:3001/event/RSVP", data)
      .then(response => {
        console.log(response);
        this.setState({
          message: "You Registered To This Event"
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          message: error.response.data,
        });
      });

    this.getInfo();
  };

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

    let rsvpbutton = "";
    if (cookie.load('id') && cookie.load('user') === "student") {
      rsvpbutton = (
        <Button className="save" onClick={this.handleRSVP}><FaPlus /> RSVP for Event</Button>
      );
    }

    return (
      <div>
        {this.state.message}
        {rsvpbutton}
        <Card>
          <RSVPModal
            show={this.state.show}
            close={this.handleClose}
            students={this.state.students}
          />
          {message}
          {button}
        </Card>
      </div>
    );
  }
}

export default ContactInformation;
