import React from 'react';
import "../../components.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router";
import cookie from "react-cookies";
import DisplayStudent from "./StudentsList/DisplayStudent";


class StudentTab extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      college: "",
      major: "",
      students: [],
      message: "",
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    let path = "";

    const wspatt = new RegExp("^ *$");
    const name = (wspatt.test(this.state.name) || this.state.name === "") ? "" : this.state.name;
    const college = (wspatt.test(this.state.college) || this.state.college === "") ? "" : this.state.college;
    const major = (wspatt.test(this.state.major) || this.state.major === "") ? "" : this.state.major;

    if (name === "" && college === "" && major === "") path = "all";
    if (name !== "" && college === "" && major === "") path = "name";
    if (name === "" && college !== "" && major === "") path = "college";
    if (name === "" && college === "" && major !== "") path = "major";
    if (name !== "" && college !== "" && major === "") path = "nameandcollege";
    if (name !== "" && college === "" && major !== "") path = "nameandmajor";
    if (name === "" && college !== "" && major !== "") path = "collegeandmajor";
    if (name !== "" && college !== "" && major !== "") path = "nameandcollegeandmajor";


    const data = {
      name: this.state.name,
      major: this.state.major,
      college: this.state.college,
    };

    axios.post(`http://localhost:3001/studentslist/${path}`, data)
      .then(response => {
        const info = response.data;

        this.setState({
          students: info.students,
        });

        if (this.state.students === undefined || this.state.students.length === 0) {
          this.setState({
            message: "No Students Found",
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

  handleName = (e) => {
    this.setState({
      name: e.target.value
    });
    this.getInfo();
  };

  handleCollege = (e) => {
    this.setState({
      college: e.target.value
    });
    this.getInfo();
  };

  handleMajor = (e) => {
    this.setState({
      major: e.target.value
    });
    this.getInfo();
  };

  // handleClick = (e) => {
  //   e.preventDefault();
  //   this.getInfo();
  // };

  // clear = (e) => {
  //   e.preventDefault();
  //   this.setState({
  //     major: "",
  //     name: "",
  //     college: "",
  //   });
  //   // this.getInfo();
  // };

  render() {
    // if not logged in go to login page
    let redirectVar = null;
    if (!cookie.load('id')) {
      redirectVar = <Redirect to="/" />;
    }

    let studentsList = "";

    if (this.state.students === undefined || this.state.students.length === 0) studentsList = "";
    else studentsList = this.state.students.map((student) => <DisplayStudent student={student} />);

    return (
      <div>
        {redirectVar}
        <Card className="studentslistbarcard">
          <Container>
            <Row>
              <Col sm={4}>
                <Card.Title className="studentslistbar"><h2>Explore Students</h2></Card.Title>
              </Col>
            </Row>
          </Container>
        </Card>
        <Container>
          <Row>
            <Col sm={4}>
              <Card style={{ padding: "0" }}>
                <ListGroup variant="flush">
                  <ListGroup.Item className="studentslisttitle">
                    <Row>
                      <Col>
                      Search
                      </Col>
                      {/* <Col style={{ textAlign: "right" }}>
                        <Button variant="Link" onClick={this.clear} className="clearbutton">CLEAR</Button>
                      </Col> */}
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Card.Text className="studentslistsubtitle">Name</Card.Text>
                    <Form.Control onChange={this.handleName} name="name" type="search" value={this.state.name} />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Card.Text className="studentslistsubtitle">College</Card.Text>
                    <Form.Control onChange={this.handleCollege} name="college" type="search" value={this.state.college} />
                  </ListGroup.Item>
                  <ListGroup.Item className="studentslisttitle">Filter</ListGroup.Item>
                  <ListGroup.Item>
                    <Card.Text className="studentslistsubtitle">Major</Card.Text>
                    <Form.Control onChange={this.handleMajor} name="major" type="search" value={this.state.major} />
                  </ListGroup.Item>
                </ListGroup>
                {/* <Button onClick={this.handleClick}>Search</Button> */}
              </Card>
            </Col>
            <Col sm={8}>
              <Container>
                {studentsList}
                <p className="errormessage">{this.state.message}</p>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default StudentTab;
