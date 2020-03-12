import React from 'react';
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import JobsListDisplay from "./JobsListDisplay";

class JobsLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      message: "",
    };
  }

  static getDerivedStateFromProps = (props) => ({ jobs: props.jobs, message: props.message })

  render() {
    console.log("JOBLIST");
    let jobsList = "";

    if (this.state.jobs === undefined || this.state.jobs.length === 0) jobsList = "";
    else jobsList = this.state.jobs.map((job) => <JobsListDisplay key={job.job_id} job={job} handleClick={this.handleClick} changeJob={this.props.changeJob} />);

    return (
      <Card style={{
        marginRight: "0", borderBottomRightRadius: "0", borderTopRightRadius: "0", maxHeight: "450px", height: "450px", overflowY: "scroll"
      }}
      >
        <p>{jobsList.length} Job Posts </p>
        <Nav>
          {jobsList}
        </Nav>
        <p className="errormessage">{this.state.message}</p>
      </Card>
    );
  }
}

export default JobsLists;
