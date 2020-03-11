import React from 'react';
import "../../components.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { Redirect } from "react-router";
import cookie from "react-cookies";
import { Link } from 'react-router-dom';
import JobsListContainer from "./JobsListContainer/JobsListContainer";

class JobsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      company_id: cookie.load("id"),
      jobs: [],
      message: "",
    };
  }

  componentDidMount() {
    this.getInfo();
    console.log("job will mount");
  }

  componentWillUnmount() {
    console.log("job will unmount");
  }

  getInfo = () => {
    axios.get(`http://localhost:3001/company/jobs/${this.state.company_id}`)
      .then(response => {
        const info = response.data;

        this.setState({
          jobs: info.jobs,
        });

        if (this.state.jobs === undefined || this.state.jobs.length === 0) {
          this.setState({
            message: "You Have 0 Job Posts.",
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

    let jobsList = "";

    if (this.state.jobs === undefined || this.state.jobs.length === 0) jobsList = "";
    else jobsList = this.state.jobs.map((job) => <JobsListContainer key={job.job_id} job={job} />);

    return (
      <Container style={{ width: "60%" }}>
        {redirectVar}
        <Link style={{ margin: "15px", display: "block" }} to="/company/jobs/new">Create a New Job Posting</Link>
        <p className="errormessage">{this.state.message}</p>
        {jobsList}
      </Container>
    );
  }
}

export default JobsPage;
