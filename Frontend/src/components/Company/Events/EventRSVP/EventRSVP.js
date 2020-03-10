import React from "react";
import axios from "axios";
import cookie from "react-cookies";
import { FaPlus, FaMinus } from 'react-icons/fa';
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
      message: "",
      alreadyrsvp: false,
    };
  }

  static getDerivedStateFromProps = (props) => ({ event_id: props.event_id })

  componentDidMount() {
    this.getInfo();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.alreadyrsvp !== prevState.alreadyrsvp) {
      this.getInfo();
    }
  }

  getInfo = () => {
    axios.get(`http://localhost:3001/event/RSVP/${this.state.event_id}`)
      .then(response => {
        const info = response.data;

        let inlist = false;
        inlist = info.students.some((student) => student.student_id.toString() === cookie.load("id"));

        this.setState({
          students: info.students,
          alreadyrsvp: inlist,
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
          alreadyrsvp: true,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          message: error.response.data,
        });
      });
  };

  handleUnregister = () => {
    axios.delete("http://localhost:3001/student/events/registered/delete", { data: { event_id: this.state.event_id, student_id: cookie.load('id') } })
      .then(response => {
        console.log(response);
        this.setState({
          alreadyrsvp: false,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

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
      if (this.state.alreadyrsvp === false) {
        rsvpbutton = (
          <div>
            <Button className="save" onClick={this.handleRSVP}><FaPlus /> RSVP for Event</Button><br />
            <p className="errormessage">{this.state.message}</p>
          </div>
        );
      } else {
        rsvpbutton = (
          <div>
            <Button className="delete" onClick={this.handleUnregister}><FaMinus /> Unregister from Event</Button><br />
            <p className="errormessage">{this.state.message}</p>
          </div>
        );
      }
    }

    return (
      <div>
        {rsvpbutton}
        <Card>
          <RSVPModal
            show={this.state.show}
            close={this.handleClose}
            students={this.state.students}
          />
          <p className="errormessage">{message}</p><br />
          {button}
        </Card>
      </div>
    );
  }
}

export default ContactInformation;
