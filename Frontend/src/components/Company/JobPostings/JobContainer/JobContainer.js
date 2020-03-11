import React from 'react';
import "../../../components.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
import { Redirect } from "react-router";
import axios from "axios";
import cookie from "react-cookies";
import JobInfo from "../JobInfo/JobInfo";
import JobApplications from "../JobApplications/JobApplications";

class JobContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      company_id: "",
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    axios.get(`http://localhost:3001/company/companytojob/${this.props.match.params.job_id}`)
      .then(response => {
        const info = response.data;

        this.setState({
          company_id: info.company_id.toString()
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete=() => {
    axios.delete("http://localhost:3001/company/job/delete", { data: { job_id: this.props.match.params.job_id } })
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
      redirectVar = <Redirect to="/company/jobs" />;
    }

    let del = "";
    if (cookie.load('id') === this.state.company_id && cookie.load('user') === "company") {
      del = (
        <Button className="delete" style={{ margin: "15px" }} onClick={this.handleDelete}>Delete Job Post</Button>
      );
    }

    return (
      <Container>
        {redirectVar}
        <Card>
          <JobApplications job_id={this.props.match.params.job_id} />
          <JobInfo job_id={this.props.match.params.job_id} />
        </Card>
        {del}
      </Container>
    );
  }
}

export default JobContainer;
