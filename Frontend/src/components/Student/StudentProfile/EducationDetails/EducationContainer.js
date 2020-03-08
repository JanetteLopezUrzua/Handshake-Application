import React from "react";
import axios from "axios";
// import cookie from 'react-cookies';
import DisplayEducation from "./DisplayEducation";
import EditEducation from "./EditEducation";


class EducationContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      school: this.props.school,
      editWasTriggered: false,
    };
  }

  static getDerivedStateFromProps = (props) => ({ id: props.id })

  handleClick = (e) => {
    e.preventDefault();

    this.setState({ editWasTriggered: true });
  };

  schoolNameChangeHandler = e => {
    const school = { ...this.state.school };
    school.schoolname = e.target.value;
    this.setState({
      school,
    });
  };

  locationChangeHandler = e => {
    const school = { ...this.state.school };
    school.location = e.target.value;
    this.setState({
      school,
    });
  };

  degreeChangeHandler = e => {
    const school = { ...this.state.school };
    school.degree = e.target.value;
    this.setState({
      school,
    });
  };

  majorChangeHandler = e => {
    const school = { ...this.state.school };
    school.major = e.target.value;
    this.setState({
      school,
    });
  };

  passingMonthChangeHandler = e => {
    const school = { ...this.state.school };
    school.passingmonth = e.target.value;
    this.setState({
      school,
    });
  };

  passingYearChangeHandler = e => {
    const school = { ...this.state.school };
    school.passingyear = e.target.value;
    this.setState({
      school,
    });
  };

  gpaChangeHandler = e => {
    const school = { ...this.state.school };
    school.gpa = e.target.value;
    this.setState({
      school,
    });
  };

  handleSave = (e) => {
    e.preventDefault();

    const data = {
      id: this.state.id,
      schoolname: this.state.school.schoolname,
      primaryschool: "false",
      location: this.state.school.location,
      degree: this.state.school.degree,
      major: this.state.school.major,
      passingmonth: this.state.school.passingmonth,
      passingyear: this.state.school.passingyear,
      gpa: this.state.school.gpa,

    };

    axios.post("http://localhost:3001/student/educationinfo", data)
      .then(response => {
        console.log(response);
        this.setState({
          editWasTriggered: false
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          school: "",
        });
      });
  };

  handleCancel = () => {
    this.setState({
      school: this.props.school,
      editWasTriggered: false
    });
  };

  handleDelete = (schoolname, degree, e) => {
    e.preventDefault();
    this.props.delete(schoolname, degree);
    this.setState({
      editWasTriggered: false,
    });
  };

  render() {
    console.log("render2");
    let display = "";
    display = (
      <DisplayEducation
        id={this.state.id}
        clicked={this.handleClick}
        school={this.state.school}
      />
    );

    if (this.state.editWasTriggered) {
      display = (
        <EditEducation
          schoolnamechange={this.schoolNameChangeHandler}
          locationchange={this.locationChangeHandler}
          degreechange={this.degreeChangeHandler}
          majorchange={this.majorChangeHandler}
          passingmonthchange={this.passingMonthChangeHandler}
          passingyearchange={this.passingYearChangeHandler}
          gpachange={this.gpaChangeHandler}
          save={this.handleSave}
          cancel={this.handleCancel}
          school={this.state.school}
          delete={this.handleDelete}
        />
      );
    }

    return <>{display}</>;
  }
}

export default EducationContainer;
