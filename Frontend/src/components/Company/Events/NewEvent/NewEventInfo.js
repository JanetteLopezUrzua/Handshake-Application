import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";
import cookie from 'react-cookies';
import { Redirect } from "react-router";
import NewBanner from "./NewBanner";

class EventInfo extends React.Component {
  constructor() {
    super();

    this.state = {
      company_id: cookie.load("id"),
      bannerphoto: "",
      title: "",
      dayofweek: "",
      month: "",
      day: "",
      year: "",
      starttime: "",
      startdaytime: "",
      endtime: "",
      enddaytime: "",
      timezone: "",
      location: "",
      eligibilityoption: "",
      eligibility: "",
      description: "",
      errormessage: "",
      redirect: false,
    };
  }

  handlephotochange = (photo) => {
    this.setState({
      bannerphoto: photo,
    });
  }

  titleChangeHandler = e => {
    this.setState({
      title: e.target.value
    });
  };

  dayOfWeekChangeHandler = e => {
    this.setState({
      dayofweek: e.target.value
    });
  };

  monthChangeHandler = e => {
    this.setState({
      month: e.target.value
    });
  };

  dayChangeHandler = e => {
    this.setState({
      day: e.target.value
    });
  };

  yearChangeHandler = e => {
    this.setState({
      year: e.target.value
    });
  };

  startTimeChangeHandler = e => {
    this.setState({
      starttime: e.target.value
    });
  };

  startDayTimeChangeHandler = e => {
    this.setState({
      startdaytime: e.target.value
    });
  };

  endTimeChangeHandler = e => {
    this.setState({
      endtime: e.target.value
    });
  };

  endDayTimeChangeHandler = e => {
    this.setState({
      enddaytime: e.target.value
    });
  };

  timeZoneChangeHandler = e => {
    this.setState({
      timezone: e.target.value
    });
  };

  locationChangeHandler = e => {
    this.setState({
      location: e.target.value
    });
  };

  eligibilityOptionChangeHandler = e => {
    this.setState({
      eligibilityoption: e.target.value,
      eligibility: e.target.value,
    });
  };

  eligibilityChangeHandler = e => {
    this.setState({
      eligibility: e.target.value
    });
  };


  descriptionChangeHandler = e => {
    this.setState({
      description: e.target.value
    });
  };

  handlePost = (e) => {
    e.preventDefault();

    const {
      title, dayofweek, month, day, year, starttime, startdaytime, endtime, enddaytime, timezone, location, eligibility
    } = this.state;

    let err = "";

    const wspatt = new RegExp("^ *$");
    if (title === "" || wspatt.test(title)) {
      err = "Required. Enter Title.";
    } else if (dayofweek === "" || wspatt.test(dayofweek)) {
      err = "Required. Select Day of Week.";
    } else if (month === "" || wspatt.test(month)) {
      err = "Required. Select Month.";
    } else if (day === "" || wspatt.test(day)) {
      err = "Required. Select Day.";
    } else if (year === "" || wspatt.test(year)) {
      err = "Required. Select Year.";
    } else if (starttime === "" || wspatt.test(starttime)) {
      err = "Required. Select Start Time.";
    } else if (startdaytime === "" || wspatt.test(startdaytime)) {
      err = "Required. Select Start Time AM or PM.";
    } else if (endtime === "" || wspatt.test(endtime)) {
      err = "Required. Select End Time.";
    } else if (enddaytime === "" || wspatt.test(enddaytime)) {
      err = "Required. Select End Time AM or PM.";
    } else if (timezone === "" || wspatt.test(timezone)) {
      err = "Required. Select time Zone.";
    } else if (location === "" || wspatt.test(location)) {
      err = "Required. Enter Location.";
    } else if (eligibility === "" || wspatt.test(eligibility)) {
      err = "Required. Enter Eligibility.";
    }

    if (err === "") {
      axios
        .post('http://localhost:3001/upload', this.state.bannerphoto)
        .then(response => {
          console.log("res", response.data);

          const data = {
            company_id: this.state.company_id,
            bannerphoto: response.data,
            title: this.state.title,
            dayofweek: this.state.dayofweek,
            month: this.state.month,
            day: this.state.day,
            year: this.state.year,
            starttime: this.state.starttime,
            startdaytime: this.state.startdaytime,
            endtime: this.state.endtime,
            enddaytime: this.state.enddaytime,
            timezone: this.state.timezone,
            location: this.state.location,
            eligibility: this.state.eligibility,
            description: this.state.description
          };

          return axios.post("http://localhost:3001/company/newevent", data);
        })
        .then(response => {
          console.log(response);
          this.setState({
            redirect: true,
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.setState({
        errormessage: err,
      });
    }
  };

  render() {
    let redirectVar = "";
    if (this.state.redirect === true) {
      redirectVar = <Redirect to="/company/events" />;
    }

    let inputfield = "";
    if (this.state.eligibilityoption === "other") {
      inputfield = (
        <Form.Group controlId="eligibility">
          <Form.Label className="labels">Enter Eligibility Major</Form.Label>
          <Form.Control onChange={this.eligibilityChangeHandler} name="eligibility" type="text" />
        </Form.Group>
      );
    }

    return (
      <Container>
        {redirectVar}
        <NewBanner handlephotochange={this.handlephotochange} />
        <Card>
          <Form.Group controlId="title">
            <Form.Label className="labels">Title</Form.Label>
            <Form.Control onChange={this.titleChangeHandler} name="title" type="text" />
          </Form.Group>
          <Form.Group controlId="dayofweek">
            <Form.Label className="labels">Day Of The Week</Form.Label>
            <Form.Control as="select" onChange={this.dayOfWeekChangeHandler} name="dayofweek">
              <option value="" hidden> </option>
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
              <option value="6">Saturday</option>
              <option value="7">Sunday</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label className="labels">Date</Form.Label>
            <Row>
              <Col>
                <Form.Control as="select" onChange={this.monthChangeHandler} name="month">
                  <option value="" hidden> </option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </Form.Control>
              </Col>
              <Col>
                <Form.Control as="select" onChange={this.dayChangeHandler} name="day">
                  <option value="" hidden> </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                </Form.Control>
              </Col>
              <Col>
                <Form.Control as="select" onChange={this.yearChangeHandler} name="year">
                  <option value="" hidden> </option>
                  <option value="2030">2030</option>
                  <option value="2029">2029</option>
                  <option value="2028">2028</option>
                  <option value="2027">2027</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                </Form.Control>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="starttime">
            <Form.Label className="labels">Start Time</Form.Label>
            <Row>
              <Col>
                <Form.Control as="select" onChange={this.startTimeChangeHandler} name="starttime">
                  <option value="" hidden> </option>
                  <option value="12:00">12:00</option>
                  <option value="12:15">12:15</option>
                  <option value="12:30">12:30</option>
                  <option value="12:45">12:45</option>
                  <option value="1:00">1:00</option>
                  <option value="1:15">1:15</option>
                  <option value="1:30">1:30</option>
                  <option value="1:45">1:45</option>
                  <option value="2:00">2:00</option>
                  <option value="2:15">2:15</option>
                  <option value="2:30">2:30</option>
                  <option value="2:45">2:45</option>
                  <option value="3:00">3:00</option>
                  <option value="3:15">3:15</option>
                  <option value="3:30">3:30</option>
                  <option value="3:45">3:45</option>
                  <option value="4:00">4:00</option>
                  <option value="4:15">4:15</option>
                  <option value="4:30">4:30</option>
                  <option value="4:45">4:45</option>
                  <option value="5:00">5:00</option>
                  <option value="5:15">5:15</option>
                  <option value="5:30">5:30</option>
                  <option value="5:45">5:45</option>
                  <option value="6:00">6:00</option>
                  <option value="6:15">6:15</option>
                  <option value="6:30">6:30</option>
                  <option value="6:45">6:45</option>
                  <option value="7:00">7:00</option>
                  <option value="7:15">7:15</option>
                  <option value="7:30">7:30</option>
                  <option value="7:45">7:45</option>
                  <option value="8:00">8:00</option>
                  <option value="8:15">8:15</option>
                  <option value="8:30">8:30</option>
                  <option value="8:45">8:45</option>
                  <option value="9:00">9:00</option>
                  <option value="9:15">9:15</option>
                  <option value="9:30">9:30</option>
                  <option value="9:45">9:45</option>
                  <option value="10:00">10:00</option>
                  <option value="10:15">10:15</option>
                  <option value="10:30">10:30</option>
                  <option value="10:45">10:45</option>
                  <option value="11:00">11:00</option>
                  <option value="11:15">11:15</option>
                  <option value="11:30">11:30</option>
                  <option value="11:45">11:45</option>
                </Form.Control>
              </Col>
              <Col>
                <Form.Control as="select" onChange={this.startDayTimeChangeHandler} name="startdaytime">
                  <option value="" hidden> </option>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </Form.Control>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="endtime">
            <Form.Label className="labels">End Time</Form.Label>
            <Row>
              <Col>
                <Form.Control as="select" onChange={this.endTimeChangeHandler} name="endtime">
                  <option value="" hidden> </option>
                  <option value="12:00">12:00</option>
                  <option value="12:15">12:15</option>
                  <option value="12:30">12:30</option>
                  <option value="12:45">12:45</option>
                  <option value="1:00">1:00</option>
                  <option value="1:15">1:15</option>
                  <option value="1:30">1:30</option>
                  <option value="1:45">1:45</option>
                  <option value="2:00">2:00</option>
                  <option value="2:15">2:15</option>
                  <option value="2:30">2:30</option>
                  <option value="2:45">2:45</option>
                  <option value="3:00">3:00</option>
                  <option value="3:15">3:15</option>
                  <option value="3:30">3:30</option>
                  <option value="3:45">3:45</option>
                  <option value="4:00">4:00</option>
                  <option value="4:15">4:15</option>
                  <option value="4:30">4:30</option>
                  <option value="4:45">4:45</option>
                  <option value="5:00">5:00</option>
                  <option value="5:15">5:15</option>
                  <option value="5:30">5:30</option>
                  <option value="5:45">5:45</option>
                  <option value="6:00">6:00</option>
                  <option value="6:15">6:15</option>
                  <option value="6:30">6:30</option>
                  <option value="6:45">6:45</option>
                  <option value="7:00">7:00</option>
                  <option value="7:15">7:15</option>
                  <option value="7:30">7:30</option>
                  <option value="7:45">7:45</option>
                  <option value="8:00">8:00</option>
                  <option value="8:15">8:15</option>
                  <option value="8:30">8:30</option>
                  <option value="8:45">8:45</option>
                  <option value="9:00">9:00</option>
                  <option value="9:15">9:15</option>
                  <option value="9:30">9:30</option>
                  <option value="9:45">9:45</option>
                  <option value="10:00">10:00</option>
                  <option value="10:15">10:15</option>
                  <option value="10:30">10:30</option>
                  <option value="10:45">10:45</option>
                  <option value="11:00">11:00</option>
                  <option value="11:15">11:15</option>
                  <option value="11:30">11:30</option>
                  <option value="11:45">11:45</option>
                </Form.Control>
              </Col>
              <Col>
                <Form.Control as="select" onChange={this.endDayTimeChangeHandler} name="enddaytime">
                  <option value="" hidden> </option>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </Form.Control>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="timezone">
            <Form.Label className="labels">Time Zone</Form.Label>
            <Form.Control as="select" onChange={this.timeZoneChangeHandler} name="timezone">
              <option value="" hidden> </option>
              <option value="PST">PDT</option>
              <option value="EDT">EDT</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="location">
            <Form.Label className="labels">Location</Form.Label>
            <Form.Control onChange={this.locationChangeHandler} name="location" type="text" />
          </Form.Group>

          <Form.Group controlId="eligibility">
            <Form.Label className="labels">Eligibility</Form.Label>
            <Form.Control as="select" onChange={this.eligibilityOptionChangeHandler} name="eligibility">
              <option value="" hidden> </option>
              <option value="all">All</option>
              <option value="other">Other</option>
            </Form.Control>
            {inputfield}
          </Form.Group>
          <p className="errormessage">{this.state.errormessage}</p>
        </Card>
        <Card>
          <Form.Group controlId="Description">
            <Form.Label className="labels">Description</Form.Label>
            <Form.Control as="textarea" rows="5" onChange={this.descriptionChangeHandler} name="description" type="text" />
          </Form.Group>
        </Card>
        <Row style={{ paddingBottom: "15px" }}>
          <Col style={{ textAlign: "center" }}>
            <Button className="save" onClick={this.handlePost}>Post</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default EventInfo;
