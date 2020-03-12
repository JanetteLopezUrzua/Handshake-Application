import React from "react";
import axios from "axios";
import cookie from "react-cookies";
// import Card from "react-bootstrap/Card";
// import Container from "react-bootstrap/Container";
// import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
// import Row from "react-bootstrap/Row";
// import { FaCamera } from "react-icons/fa";
import ApplicationModal from "./ApplicationModal";

class Application extends React.Component {
  constructor() {
    super();

    this.state = {
      student_id: cookie.load('id'),
      job_id: "",
      show: false,
      validfile: "",
      errormessage: "",
      data: "",
      alreadyapplied: false,
    };
  }

  static getDerivedStateFromProps = props => ({ job_id: props.job_id });


  resumeHandler = e => {
    e.preventDefault();
    const file = e.target.files[0];

    console.log(file);
    this.getResume(file);
  };

  getResume = file => {
    const data = new FormData();

    if (file && file.type.match('.pdf')) {
      data.append('file', file);
      data.append('name', 'file');

      this.setState({
        data,
        validfile: true,
        errormessage: "",
      });
    } else {
      this.setState({
        validfile: false,
        errormessage: "File not accepted. Choose a PDF File."
      });
    }
  };

  onUpload = e => {
    e.preventDefault();
    if (this.state.validfile === true) {
      axios
        .post('http://localhost:3001/upload', this.state.data)
        .then(response => {
          console.log("res", response.data);

          const date = new Date();
          const day = (`${date.getDate()}`).slice(-2);
          let month = (`${date.getMonth()}`).slice(-2);
          const year = date.getFullYear();

          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

          month = months[month];

          const applicationdate = `${month} ${day}, ${year}`;

          const data = {
            student_id: this.state.student_id,
            job_id: this.state.job_id,
            file: response.data,
            appdate: applicationdate
          };

          return axios.post('http://localhost:3001/resumes', data);
        })
        .then(response => {
          console.log(response);
          this.setState({
            errormessage: "",
            show: false,
          });
        })
        .catch(error => {
          console.log(error.response.data);
        });
    }
  };

  handleClose = () => {
    // eslint-disable-next-line implicit-arrow-linebreak
    this.setState({
      show: false,
      errormessage: ""
    });
  };

  handleShow = () =>
    // eslint-disable-next-line implicit-arrow-linebreak
    this.setState({
      show: true
    });


  render() {
    console.log("REEEEEEEEEEEEENDER");
    let button = "";
    if (this.state.alreadyapplied === true) {
      button = <Button className="cancel" style={{ backgroundColor: "#ccc" }} onClick={this.handleShow} disabled>Applied</Button>;
    } else button = <Button className="save" onClick={this.handleShow}>Apply</Button>;

    return (
      <div>
        <ApplicationModal
          show={this.state.show}
          close={this.handleClose}
          onUpload={this.onUpload}
          resumeHandler={this.resumeHandler}
          errormessage={this.state.errormessage}
        />
        {button}
      </div>
    );
  }
}

export default Application;
