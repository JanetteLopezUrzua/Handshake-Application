import React from "react";

import Container from "react-bootstrap/Container";
import DisplayStudent from "./DisplayStudent";


class StudentsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      message: "",
      name: "",
      college: "",
      major: "",
    };
  }

  static getDerivedStateFromProps = (props) => ({ name: props.name, college: props.college, major: props.major })

  componentDidMount() {
    let name = "";
    let college = "";
    let major = "";
    let path = "";

    const wspatt = new RegExp("^ *$");
    name = (wspatt.test(this.state.name)) ? "" : this.state.name;
    college = (wspatt.test(this.state.college)) ? "" : this.state.college;
    major = (wspatt.test(this.state.major)) ? "" : this.state.major;

    if (name === "" && college === "" && major === "") path = "all";
    if (name !== "" && college === "" && major === "") path = "name";
    if (name === "" && college !== "" && major === "") path = "college";
    if (name === "" && college === "" && major !== "") path = "major";
    if (name !== "" && college !== "" && major === "") path = "nameandcollege";
    if (name !== "" && college === "" && major !== "") path = "nameandmajor";
    if (name === "" && college !== "" && major !== "") path = "collegeandmajor";

    this.getInfo(path);
  }

  getInfo = (path) => {
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

  render() {
    let studentsList = "";

    if (this.state.students === undefined || this.state.students.length === 0) studentsList = "";
    else studentsList = this.state.students.map((student) => <DisplayStudent student={student} />);

    return (
      <Container>
        {studentsList}
        <p className="errormessage">{this.state.message}</p>
      </Container>
    );
  }
}

export default StudentsList;
