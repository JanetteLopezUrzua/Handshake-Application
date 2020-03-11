import React from 'react';
import "../../../components.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaSearch } from 'react-icons/fa';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { MdLocationOn } from 'react-icons/md';
import { Redirect } from "react-router";
import axios from "axios";
import cookie from "react-cookies";
import JobsList from "./JobsList/JobsList";
import JobsDescription from "./JobsDescription";

class JobSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameortitle: "",
      fulltime: false,
      parttime: false,
      internship: false,
      oncampus: false,
      location: "",
      message: "",
      jobs: [],
      job: "",
    };
  }

  componentDidMount() {
    console.log("JOBSEARCH");
    this.getInfo();
  }

  componentDidUpdate(previousProps, previousState) {
    if ((previousState.nameortitle !== this.state.nameortitle)
    || (previousState.fulltime !== this.state.fulltime) || (previousState.parttime !== this.state.parttime)
    || (previousState.internship !== this.state.internship) || (previousState.oncampus !== this.state.oncampus)
    || (previousState.location !== this.state.location)) {
      this.getInfo();
    }
  }

  getInfo = () => {
    let path = "";

    const wspatt = new RegExp("^ *$");
    const nameortitle = (wspatt.test(this.state.nameortitle) || this.state.nameortitle === "") ? "" : this.state.nameortitle;
    const location = (wspatt.test(this.state.location) || this.state.location === "") ? "" : this.state.location;
    const {
      fulltime, parttime, internship, oncampus
    } = this.state;
    if (nameortitle === "" && location === "" && fulltime === false && parttime === false && internship === false && oncampus === false) path = "all";
    if (nameortitle !== "" && location === "" && fulltime === false && parttime === false && internship === false && oncampus === false) path = "nameortitle";
    if (nameortitle === "" && location !== "" && fulltime === false && parttime === false && internship === false && oncampus === false) path = "location";

    if (nameortitle === "" && location === "" && fulltime === true && parttime === false && internship === false && oncampus === false) path = "fulltime";
    if (nameortitle === "" && location === "" && fulltime === false && parttime === true && internship === false && oncampus === false) path = "parttime";
    if (nameortitle === "" && location === "" && fulltime === false && parttime === false && internship === true && oncampus === false) path = "internship";
    if (nameortitle === "" && location === "" && fulltime === false && parttime === false && internship === false && oncampus === true) path = "oncampus";

    if (nameortitle === "" && location !== "" && fulltime === true && parttime === false && internship === false && oncampus === false) path = "lfulltime";
    if (nameortitle === "" && location !== "" && fulltime === false && parttime === true && internship === false && oncampus === false) path = "lparttime";
    if (nameortitle === "" && location !== "" && fulltime === false && parttime === false && internship === true && oncampus === false) path = "linternship";
    if (nameortitle === "" && location !== "" && fulltime === false && parttime === false && internship === false && oncampus === true) path = "loncampus";

    if (nameortitle !== "" && location === "" && fulltime === true && parttime === false && internship === false && oncampus === false) path = "ntfulltime";
    if (nameortitle !== "" && location === "" && fulltime === false && parttime === true && internship === false && oncampus === false) path = "ntparttime";
    if (nameortitle !== "" && location === "" && fulltime === false && parttime === false && internship === true && oncampus === false) path = "ntinternship";
    if (nameortitle !== "" && location === "" && fulltime === false && parttime === false && internship === false && oncampus === true) path = "ntoncampus";

    if (nameortitle !== "" && location !== "" && fulltime === true && parttime === false && internship === false && oncampus === false) path = "lntfulltime";
    if (nameortitle !== "" && location !== "" && fulltime === false && parttime === true && internship === false && oncampus === false) path = "lntparttime";
    if (nameortitle !== "" && location !== "" && fulltime === false && parttime === false && internship === true && oncampus === false) path = "lntinternship";
    if (nameortitle !== "" && location !== "" && fulltime === false && parttime === false && internship === false && oncampus === true) path = "lntoncampus";

    const data = {
      nameortitle: this.state.nameortitle,
      location: this.state.location,
    };

    axios.post(`http://localhost:3001/student/jobslist/${path}`, data)
      .then(response => {
        const info = response.data;

        this.setState({
          jobs: info.jobs,
          job: info.jobs[0],
        });


        if (info.jobs === undefined || info.jobs.length === 0) {
          this.setState({
            message: "No Job Postings Found",
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

  handleNameOrTitle = (e) => {
    this.setState({
      nameortitle: e.target.value
    });
  };

  handleLocation = (e) => {
    this.setState({
      location: e.target.value
    });
  };

  fulltimeClick = () => {
    this.setState({
      fulltime: true,
      parttime: false,
      internship: false,
      oncampus: false,
    });
  };

  parttimeClick = () => {
    this.setState({
      fulltime: false,
      parttime: true,
      internship: false,
      oncampus: false,
    });
  };

  internshipClick = () => {
    this.setState({
      fulltime: false,
      parttime: false,
      internship: true,
      oncampus: false,
    });
  };

  oncampusClick = () => {
    this.setState({
      fulltime: false,
      parttime: false,
      internship: false,
      oncampus: true,
    });
  };

  changeJob = (e, pjob) => {
    this.setState({
      job: pjob,
    });
  }

  onClearClick=() => {
    this.setState({
      fulltime: false,
      parttime: false,
      internship: false,
      oncampus: false,
    });
  }

  render() {
    console.log("JOBSEARCH");
    // if not logged in go to login page
    let redirectVar = null;
    if (!cookie.load('id')) {
      redirectVar = <Redirect to="/" />;
    }

    let clear = "";
    if (this.state.fulltime === true || this.state.parttime === true || this.state.internship === true || this.state.oncampus === true) {
      clear = <Button variant="link" className="categorybuttons" onClick={this.onClearClick}>Clear</Button>;
    } else clear = "";

    let button1 = "";
    let button2 = "";
    let button3 = "";
    let button4 = "";

    if (this.state.fulltime === true) {
      button1 = <Button className="categorybuttons" onClick={this.fulltimeClick} active>Full-Time Job</Button>;
    } else button1 = <Button className="categorybuttons" onClick={this.fulltimeClick}>Full-Time Job</Button>;

    if (this.state.parttime === true) {
      button2 = <Button className="categorybuttons" onClick={this.parttimeClick} active>Part-Time</Button>;
    } else button2 = <Button className="categorybuttons" onClick={this.parttimeClick}>Part-Time</Button>;

    if (this.state.internship === true) {
      button3 = <Button className="categorybuttons" onClick={this.internshipClick} active>Internships</Button>;
    } else button3 = <Button className="categorybuttons" onClick={this.internshipClick}>Internships</Button>;

    if (this.state.oncampus === true) {
      button4 = <Button className="categorybuttons" onClick={this.oncampusClick} active>On-Campus</Button>;
    } else button4 = <Button className="categorybuttons" onClick={this.oncampusClick}>On-Campus</Button>;

    return (
      <Container>
        {redirectVar}
        <Card style={{ padding: "15px" }}>
          <Row>
            <Col>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  style={{ fontSize: "12px" }}
                  onChange={this.handleNameOrTitle}
                  type="search"
                  placeholder="Company name or job title"
                />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <MdLocationOn />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  style={{ fontSize: "12px" }}
                  onChange={this.handleLocation}
                  type="search"
                  placeholder="City"
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            {button1}
            {button2}
            {button3}
            {button4}
            {clear}
          </Row>
        </Card>
        <Row>
          <Col sm={4} style={{ paddingRight: "0" }}>
            <JobsList jobs={this.state.jobs} message={this.state.message} changeJob={this.changeJob} />
          </Col>
          <Col sm={8} style={{ paddingLeft: "0" }}>
            <JobsDescription job={this.state.job} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default JobSearch;
