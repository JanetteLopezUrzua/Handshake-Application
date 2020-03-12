import React from 'react';
import "../../../components.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router";
import cookie from "react-cookies";
import ApplicationsListContainer from "./ApplicationsListContainer";


class ApplicationsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      pending: false,
      reviewed: false,
      declined: false,
      applications: [],
      message: "",
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  componentDidUpdate(previousProps, previousState) {
    if ((previousState.pending !== this.state.pending) || (previousState.reviewed !== this.state.reviewed) || (previousState.declined !== this.state.declined)) {
      this.getInfo();
    }
  }

  getInfo = () => {
    let path = "";

    const { pending, reviewed, declined } = this.state;

    if (pending === false && reviewed === false && declined === false) path = "all";
    if (pending === true && reviewed === false && declined === false) path = "pending";
    if (pending === false && reviewed === true && declined === false) path = "reviewed";
    if (pending === false && reviewed === false && declined === true) path = "declined";

    const data = {
      student_id: cookie.load('id'),
    };

    axios.post(`http://localhost:3001/student/applicationslist/${path}`, data)
      .then(response => {
        const info = response.data;

        this.setState({
          applications: info.applications,
        });

        if (this.state.applications === undefined || this.state.applications.length === 0) {
          this.setState({
            message: "No Applications Found",
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

  handlePendingClick = () => {
    this.setState({
      pending: true,
      reviewed: false,
      declined: false,
    });
  };

  handleReviewedClick = () => {
    this.setState({
      pending: false,
      reviewed: true,
      declined: false,
    });
  };

  handleDeclinedClick = () => {
    this.setState({
      pending: false,
      reviewed: false,
      declined: true,
    });
  };

  handleClearClick = () => {
    this.setState({
      pending: false,
      reviewed: false,
      declined: false,
    });
  };

  render() {
    // if not logged in go to login page
    let redirectVar = null;
    if (!cookie.load('id')) {
      redirectVar = <Redirect to="/" />;
    } else if (cookie.load('id') && cookie.load('user') === "company") {
      redirectVar = <Redirect to={`/company/${cookie.load('id')}`} />;
    }

    let clear = "";
    if (this.state.pending === true || this.state.reviewed === true || this.state.declined === true) {
      clear = <Button variant="link" className="categorybuttons" onClick={this.handleClearClick}>Clear</Button>;
    } else clear = "";

    let button1 = "";
    let button2 = "";
    let button3 = "";

    if (this.state.pending === true) {
      button1 = <Button className="categorybuttons" onClick={this.handlePendingClick} active>Pending</Button>;
    } else button1 = <Button className="categorybuttons" onClick={this.handlePendingClick}>Pending</Button>;

    if (this.state.reviewed === true) {
      button2 = <Button className="categorybuttons" onClick={this.handleReviewedClick} active>Reviewed</Button>;
    } else button2 = <Button className="categorybuttons" onClick={this.handleReviewedClick}>Reviewed</Button>;

    if (this.state.declined === true) {
      button3 = <Button className="categorybuttons" onClick={this.handleDeclinedClick} active>Declined</Button>;
    } else button3 = <Button className="categorybuttons" onClick={this.handleDeclinedClick}>Declined</Button>;

    let applicationsList = "";

    if (this.state.applications === undefined || this.state.applications.length === 0) applicationsList = "";
    else applicationsList = this.state.applications.map((application) => <ApplicationsListContainer application={application} />);

    return (
      <div>
        {redirectVar}
        <Container>
          <Row>
            <Col sm={4}>
              <Card style={{ padding: "0" }}>
                <ListGroup variant="flush">
                  <ListGroup.Item className="studentslisttitle">
                    <Row>
                      <Col>
                      Filters
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      {button1}
                      {button2}
                      {button3}
                    </Row>
                    <Row>
                      {clear}
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col sm={8}>
              <Container>
                {applicationsList}
                <p className="errormessage">{this.state.message}</p>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ApplicationsPage;
