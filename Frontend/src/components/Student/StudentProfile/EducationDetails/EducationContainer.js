import React from "react";
import axios from "axios";
// import cookie from 'react-cookies';
import DisplayEducation from "./DisplayEducation";
import EditEducation from "./EditEducation";


class EducationContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      school: {},
      editWasTriggered: false
    };
  }

  static getDerivedStateFromProps = (props) => ({ id: props.id, school: props.school })

  componentDidMount() {
    const wspatt = new RegExp("^ *$");
    let {
      schoolname, location, degree, major, passingmonth, passingyear, gpa
    } = this.state.school;

    console.log(schoolname, location, degree);

    if (schoolname === null || wspatt.test(schoolname)) {
      schoolname = "";
    }
    if (location === null || wspatt.test(location)) {
      location = "";
    }
    if (degree === null || wspatt.test(degree)) {
      degree = "";
    }
    if (major === null || wspatt.test(major)) {
      major = "";
    }
    if (passingmonth === null || wspatt.test(passingmonth)) {
      passingmonth = "";
    }
    if (passingyear === null || wspatt.test(passingyear)) {
      passingyear = "";
    }
    if (gpa === null || wspatt.test(gpa)) {
      gpa = "";
    }

    this.setState({
      school: {
        schoolname,
        location,
        degree,
        major,
        passingmonth,
        passingyear,
        gpa,
      }
    });
  }

  handleClick = (e) => {
    e.preventDefault();
    console.log("button was pressed!!!!");
    this.setState({ editWasTriggered: true });

    // this.getInfo();
  };

  nameChangeHandler = e => {
    this.setState({
      name: e.target.value
    });
  };

  dobChangeHandler = e => {
    this.setState({
      dob: e.target.value
    });
  };

  cityChangeHandler = e => {
    this.setState({
      city: e.target.value
    });
  };

  stateChangeHandler = e => {
    this.setState({
      state: e.target.value
    });
  };

  countryChangeHandler = e => {
    this.setState({
      country: e.target.value
    });
  };

  handleSave = (e) => {
    e.preventDefault();
    const data = {
      id: this.state.id,
      name: this.state.name,
      dob: this.state.dob,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
    };

    axios.post("http://localhost:3001/student/personalinfo", data)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

    this.setState({ editWasTriggered: false });
  };

  handleCancel = () => {
    this.setState({ editWasTriggered: false });
  };

  render() {
    let display = "";
    display = (
      <DisplayEducation
        clicked={this.handleClick}
        school={this.state.school}
      />
    );

    if (this.state.editWasTriggered) {
      display = (
        <EditEducation
          namechange={this.nameChangeHandler}
          dobchange={this.dobChangeHandler}
          citychange={this.cityChangeHandler}
          statechange={this.stateChangeHandler}
          countrychange={this.countryChangeHandler}
          save={this.handleSave}
          cancel={this.handleCancel}
          data={this.state}
        />
      );
    }

    return <>{display}</>;
  }
}

export default EducationContainer;
