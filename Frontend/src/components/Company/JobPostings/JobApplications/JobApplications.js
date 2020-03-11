import React from "react";
import axios from "axios";
// import cookie from "react-cookies";
// import { FaPlus, FaMinus } from 'react-icons/fa';
// import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import JobApplicationsModal from "./JobApplicationsModal";

class JobApplications extends React.Component {
  constructor() {
    super();

    this.state = {
      job_id: "",
      show: false,
      students: [],
    };
  }

  static getDerivedStateFromProps = (props) => ({ job_id: props.job_id })

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    axios.get(`http://localhost:3001/job/applied/${this.state.job_id}`)
      .then(response => {
        const info = response.data;
        this.setState({
          students: info.students,
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
    this.getInfo();
  };

  handleShow = () => {
    // eslint-disable-next-line implicit-arrow-linebreak
    this.setState({
      show: true
    });
  };

  // eslint-disable-next-line camelcase
  handleStatus = (e, pstudent_id) => {
    const data = {
      student_id: pstudent_id,
      job_id: this.state.job_id,
      status: e.target.value,
    };


    console.log(e.target.value);

    axios.post("http://localhost:3001/job/studentstatus", data)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

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
          handleStatus={this.handleStatus}
        />
        {button}<br />
        <p className="errormessage">{message}</p>
      </div>
    );
  }
}

export default JobApplications;
