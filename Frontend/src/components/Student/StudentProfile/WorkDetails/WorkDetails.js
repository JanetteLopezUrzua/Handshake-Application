import React from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import cookie from 'react-cookies';
import NavDropdown from "react-bootstrap/NavDropdown";
import WorkContainer from "./WorkContainer";
import NewFormWork from "./NewFormWork";


class WorkDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      jobs: [],
      newform: false,
      message: "",
      job: {
        companyname: "",
        title: "",
        startdatemonth: "",
        startdateyear: "",
        enddatemonth: "",
        enddateyear: "",
        description: "",
      },
      errormessages: {}
    };
  }

  static getDerivedStateFromProps = (props) => ({ id: props.id })

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    axios.get(`http://localhost:3001/student/workinfo/${this.state.id}`)
      .then(response => {
        const info = response.data;

        this.setState({
          jobs: info.jobs,
        });

        if (this.state.jobs === undefined || this.state.jobs.length === 0) {
          this.setState({
            message: "Where is somewhere you have worked?",
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
  };

  addWork=(e) => {
    e.preventDefault();

    this.setState({
      newform: true,
    });
  }

  companyNameChangeHandler = e => {
    const job = { ...this.state.job };
    job.companyname = e.target.value;
    this.setState({
      job,
    });
  };

  titleChangeHandler = e => {
    const job = { ...this.state.job };
    job.title = e.target.value;
    this.setState({
      job,
    });
  };

  startDateMonthChangeHandler = e => {
    const job = { ...this.state.job };
    job.startdatemonth = e.target.value;
    this.setState({
      job,
    });
  };

  startDateYearChangeHandler = e => {
    const job = { ...this.state.job };
    job.startdateyear = e.target.value;
    this.setState({
      job,
    });
  };

  endDateMonthChangeHandler = e => {
    const job = { ...this.state.job };
    job.enddatemonth = e.target.value;
    this.setState({
      job,
    });
  };

  endDateYearChangeHandler = e => {
    const job = { ...this.state.job };
    job.enddateyear = e.target.value;
    this.setState({
      job,
    });
  };

  descriptionChangeHandler = e => {
    const job = { ...this.state.job };
    job.description = e.target.value;
    this.setState({
      job,
    });
  };

  handleSave = (e) => {
    e.preventDefault();

    const wspatt = new RegExp("^ *$");
    if (this.state.job.companyname === "" || wspatt.test(this.state.job.companyname) || this.state.job.companyname === undefined) {
      this.setState({
        errormessages: {
          companynameerror: "Company name must be entered."
        }
      });
    } else if (this.state.job.title === "" || wspatt.test(this.state.job.title) || this.state.job.title === undefined) {
      this.setState({
        errormessages: {
          titleerror: "Job title must be entered."
        }
      });
    } else if (this.state.job.startdatemonth === "" || wspatt.test(this.state.job.startdatemonth) || this.state.job.startdatemonth === undefined
              || this.state.job.startdateyear === "" || wspatt.test(this.state.job.startdateyear) || this.state.job.startdateyear === undefined) {
      this.setState({
        errormessages: {
          startdateerror: "Complete start date must be entered."
        }
      });
    } else if (this.state.job.enddatemonth === "" || wspatt.test(this.state.job.enddatemonth) || this.state.job.enddatemonth === undefined
    || this.state.job.enddateyear === "" || wspatt.test(this.state.job.enddateyear) || this.state.job.enddateyear === undefined) {
      this.setState({
        errormessages: {
          enddateerror: "Complete end date must be entered."
        }
      });
    } else if (this.state.job.startdateyear > this.state.job.enddateyear) {
      this.setState({
        errormessages: {
          yearerror: "End year can't be greater than start year."
        }
      });
    } else {
      const name = (this.state.job.companyname === undefined) ? null : this.state.job.companyname;
      const ti = (this.state.job.title === undefined) ? null : this.state.job.title;
      const sdm = (this.state.job.startdatemonth === undefined) ? null : this.state.job.startdatemonth;
      const sdy = (this.state.job.startdateyear === undefined) ? null : this.state.job.startdateyear;
      const edm = (this.state.job.enddatemonth === undefined) ? null : this.state.job.enddatemonth;
      const edy = (this.state.job.enddateyear === undefined) ? null : this.state.job.enddateyear;
      const des = (this.state.job.description === undefined) ? null : this.state.job.description;

      const data = {
        id: this.state.id,
        companyname: name,
        title: ti,
        startdatemonth: sdm,
        startdateyear: sdy,
        enddatemonth: edm,
        enddateyear: edy,
        description: des,
      };

      const job = {
        companyname: name,
        title: ti,
        startdatemonth: sdm,
        startdateyear: sdy,
        enddatemonth: edm,
        enddateyear: edy,
        description: des,
      };

      axios.post("http://localhost:3001/student/workinfo/newform", data)
        .then(response => {
          console.log(response);
          this.setState({
            jobs: [...this.state.jobs, job],
            job: {
              companyname: "",
              title: "",
              startdatemonth: "",
              startdateyear: "",
              enddatemonth: "",
              enddateyear: "",
              description: "",
            },
            errormessages: {},
            newform: false
          });
        })
        .catch(error => {
          console.log(error);
          this.setState({
            errormessages: {
              companynameerror: error.response.data,
            }
          });
        });
    }
  };

  handleCancel = () => {
    this.setState({
      job: {
        companyname: "",
        title: "",
        startdatemonth: "",
        startdateyear: "",
        enddatemonth: "",
        enddateyear: "",
        description: "",
      },
      newform: false
    });
  };

  handleDelete = (companyname) => {
    axios.delete("http://localhost:3001/student/workinfo/delete", { data: { id: this.state.id, companyname } })
      .then(response => {
        console.log(response);

        this.getInfo();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let jobsList = "";
    let newjobform = "";

    if (this.state.jobs === undefined || this.state.jobs.length === 0) jobsList = "";
    else jobsList = this.state.jobs.map((job) => <WorkContainer id={this.state.id} job={job} delete={this.handleDelete} />);

    if (this.state.newform === false) newjobform = "";
    else {
      newjobform = (
        <NewFormWork
          job={this.state.job}
          companynamechange={this.companyNameChangeHandler}
          titlechange={this.titleChangeHandler}
          startdatemonthchange={this.startDateMonthChangeHandler}
          startdateyearchange={this.startDateYearChangeHandler}
          enddatemonthchange={this.endDateMonthChangeHandler}
          enddateyearchange={this.endDateYearChangeHandler}
          descriptionchange={this.descriptionChangeHandler}
          save={this.handleSave}
          cancel={this.handleCancel}
          errormessages={this.state.errormessages}
        />
      );
    }

    let button = "";
    if (cookie.load('id') === this.state.id && cookie.load('user') === "student") {
      button = <Button onClick={this.addWork} className="BottomAddButton">Add Work Experience</Button>;
    } else button = "";

    return (
      <Card style={{ padding: "0" }}>
        <Card.Title style={{ paddingLeft: "24px", paddingTop: "24px" }}>Work Experience</Card.Title>
        <Form.Label style={{ color: "blue", padding: "0 24px" }}>{this.state.message}</Form.Label>
        <Container style={{ maxHeight: "800px", overflowY: "scroll" }}>{jobsList}
          {newjobform}
        </Container>
        <NavDropdown.Divider style={{ margin: "0" }}></NavDropdown.Divider>
        {button}
      </Card>
    );
  }
}

export default WorkDetails;
