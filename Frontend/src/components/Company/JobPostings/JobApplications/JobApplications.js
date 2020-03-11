import React from "react";
// import axios from "axios";
// import cookie from "react-cookies";
// import { FaPlus, FaMinus } from 'react-icons/fa';
// import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import JobApplicationsModal from "./JobApplicationsModal";

class JobApplications extends React.Component {
  constructor() {
    super();

    this.state = {
      // job_id: "",
      show: false,
      students: [],
      // message: "",
    };
  }

  static getDerivedStateFromProps = (props) => ({ job_id: props.job_id })

  componentDidMount() {
    // this.getInfo();
  }

  //   componentDidUpdate(prevProps, prevState) {
  //     if (this.state.alreadyrsvp !== prevState.alreadyrsvp) {
  //       this.getInfo();
  //     }
  //   }

  //   getInfo = () => {
  //     axios.get(`http://localhost:3001/event/RSVP/${this.state.event_id}`)
  //       .then(response => {
  //         const info = response.data;

  //         let inlist = false;
  //         inlist = info.students.some((student) => student.student_id.toString() === cookie.load("id"));

  //         this.setState({
  //           students: info.students,
  //           alreadyrsvp: inlist,
  //         });
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }

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

  //   handleRSVP = () => {
  //     const data = {
  //       student_id: cookie.load('id'),
  //       event_id: this.state.event_id,
  //     };

  //     axios.post("http://localhost:3001/event/RSVP", data)
  //       .then(response => {
  //         console.log(response);
  //         this.setState({
  //           alreadyrsvp: true,
  //         });
  //       })
  //       .catch(error => {
  //         console.log(error);
  //         this.setState({
  //           message: error.response.data,
  //         });
  //       });
  //   };

  render() {
    let message = "";
    let button = "";
    if (this.state.students.length === 0) {
      message = "No one has applied to this job.";
      button = (
        <Button style={{ cursor: "not-allowed" }} disabled>View Applications</Button>
      );
    } else {
      message = "";
      button = (
        <Button onClick={this.handleShow}>View Applications</Button>
      );
    }

    return (
      <div style={{ textAlign: "right" }}>
        <JobApplicationsModal
          show={this.state.show}
          close={this.handleClose}
          students={this.state.students}
        />
        {button}<br />
        <p className="errormessage">{message}</p>
      </div>
    );
  }
}

export default JobApplications;
