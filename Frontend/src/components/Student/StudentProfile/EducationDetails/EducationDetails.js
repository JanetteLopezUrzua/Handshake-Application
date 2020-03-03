import React from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import cookie from 'react-cookies';
import NavDropdown from "react-bootstrap/NavDropdown";
import EducationContainer from "./EducationContainer";
import NewFormEducation from "./NewFormEducation";


class EducationDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      schools: [],
      newform: false,
      message: "",
      school: {
        schoolname: "",
        location: "",
        degree: "",
        major: "",
        passingmonth: "",
        passingyear: "",
        gpa: "",
      },
      errormessage: ""
    };
  }

  static getDerivedStateFromProps = (props) => ({ id: props.id })

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    axios.get(`http://localhost:3001/student/educationinfo/${this.state.id}`)
      .then(response => {
        const info = response.data;

        this.setState({
          schools: info.schools,
        });

        if (this.state.schools === undefined || this.state.schools.length === 0) {
          this.setState({
            message: "Where is somewhere you have studied?",
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

  addSchool=(e) => {
    e.preventDefault();

    this.setState({
      newform: true,
    });
  }

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

    const wspatt = new RegExp("^ *$");
    if (this.state.school.schoolname === "" || wspatt.test(this.state.school.schoolname) || this.state.school.schoolname === undefined) {
      this.setState({
        errormessage: "School name must be entered."
      });
    } else {
      const name = (this.state.school.schoolname === undefined) ? null : this.state.school.schoolname;
      const loc = (this.state.school.location === undefined) ? null : this.state.school.location;
      const deg = (this.state.school.degree === undefined) ? null : this.state.school.degree;
      const maj = (this.state.school.major === undefined) ? null : this.state.school.major;
      const pm = (this.state.school.passingmonth === undefined) ? null : this.state.school.passingmonth;
      const py = (this.state.school.passingyear === undefined) ? null : this.state.school.passingyear;
      const gpascore = (this.state.school.gpa === undefined) ? null : this.state.school.gpa;


      const data = {
        id: this.state.id,
        schoolname: name,
        location: loc,
        degree: deg,
        major: maj,
        passingmonth: pm,
        passingyear: py,
        gpa: gpascore,
      };

      const school = {
        schoolname: name,
        location: loc,
        degree: deg,
        major: maj,
        passingmonth: pm,
        passingyear: py,
        gpa: gpascore,
      };

      axios.post("http://localhost:3001/student/educationinfo/newform", data)
        .then(response => {
          console.log(response);
          this.setState({
            schools: [...this.state.schools, school],
            school: {
              schoolname: "",
              location: "",
              degree: "",
              major: "",
              passingmonth: "",
              passingyear: "",
              gpa: "",
            },
            errormessage: "",
            newform: false
          });
        })
        .catch(error => {
          console.log(error);
          this.setState({
            school: {
              schoolname: "",
              location: "",
              degree: "",
              major: "",
              passingmonth: "",
              passingyear: "",
              gpa: "",
            },
            errormessage: error.response.data,
          });
        });
    }
  };

  handleCancel = () => {
    this.setState({ newform: false });
  };

  handleDelete = (schoolname) => {
    axios.delete("http://localhost:3001/student/educationinfo/delete", { data: { id: this.state.id, schoolname } })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

    this.getInfo();
  }

  render() {
    let schoolsList = "";
    let newschoolform = "";

    const compare = (a, b) => {
      let comparison = 0;

      if (a.passingyear > b.passingyear) {
        comparison = 1;
      } else if (a < b) {
        comparison = -1;
      }
      return comparison;
    };

    const primary = this.state.schools.sort(compare);

    if (this.state.schools === undefined || this.state.schools.length === 0) schoolsList = "";
    else schoolsList = primary.map((school) => <EducationContainer id={this.state.id} school={school} delete={this.handleDelete} />);

    if (this.state.newform === false) newschoolform = "";
    else {
      newschoolform = (
        <NewFormEducation
          school={this.state.school}
          schoolnamechange={this.schoolNameChangeHandler}
          locationchange={this.locationChangeHandler}
          degreechange={this.degreeChangeHandler}
          majorchange={this.majorChangeHandler}
          passingmonthchange={this.passingMonthChangeHandler}
          passingyearchange={this.passingYearChangeHandler}
          gpachange={this.gpaChangeHandler}
          save={this.handleSave}
          cancel={this.handleCancel}
          errormessage={this.state.errormessage}
        />
      );
    }

    return (
      <Card style={{ padding: "0" }}>
        <Card.Title style={{ paddingLeft: "24px", paddingTop: "24px" }}>Education</Card.Title>
        <Form.Label style={{ color: "blue", padding: "0 24px" }}>{this.state.message}</Form.Label>
        <Container style={{ maxHeight: "800px", overflowY: "scroll" }}>{schoolsList}
          {newschoolform}
        </Container>
        <NavDropdown.Divider style={{ margin: "0" }}></NavDropdown.Divider>
        <Button onClick={this.addSchool} className="BottomAddButton">Add School</Button>
      </Card>
    );
  }
}

export default EducationDetails;
