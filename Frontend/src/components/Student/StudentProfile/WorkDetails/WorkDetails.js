import React from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
// import cookie from 'react-cookies';
import NavDropdown from "react-bootstrap/NavDropdown";
import NavItem from "react-bootstrap/NavItem";
import EducationContainer from "../EducationDetails/EducationContainer";


class WorkDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      schools: [],
      errormessage: ""
    };
  }

  //   static getDerivedStateFromProps = (props) => ({ id: props.id })

  //   componentDidMount() {
  //     this.getInfo();
  //   }

  //   getInfo = () => {
  //     axios.get(`http://localhost:3001/student/educationinfo/${this.state.id}`)
  //       .then(response => {
  //         const info = response.data;

  //         this.setState({
  //           schools: info.schools,
  //         });
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   };

  //   skillsChangeHandler = e => {
  //     this.setState({
  //       skill: e.target.value,
  //       value: e.target.value
  //     });
  //   };

  //   handleSave = (e) => {
  //     e.preventDefault();

  //     // skill has whitespace only
  //     const wspatt = new RegExp("^ *$");

  //     if (this.state.skill === undefined || wspatt.test(this.state.skill)) {
  //       this.setState({
  //         skill: "",
  //       });
  //     } else {
  //       const data = {
  //         id: this.state.id,
  //         skills: this.state.skills,
  //         skill: this.state.skill,
  //       };

  //       axios.post("http://localhost:3001/student/skill", data)
  //         .then(response => {
  //           console.log(response);
  //           this.setState({
  //             skill: "",
  //             skills: [...data.skills, data.skill],
  //             errormessage: "",
  //             value: "",
  //           });
  //         })
  //         .catch(error => {
  //           console.log(error);
  //           this.setState({
  //             skill: "",
  //             errormessage: error.response.data,
  //             value: "",
  //           });
  //         });
  //     }
  //   };

  //   handleDelete = (skill, e) => {
  //     e.preventDefault();

  //     axios.delete("http://localhost:3001/student/skill/delete", { data: { id: this.state.id, skill } })
  //       .then(response => {
  //         console.log(response);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });

  //     this.getInfo();
  //   };

  render() {
    // let schoolsList = "";
    // if (this.state.schools.length === 0) schoolsList = "";
    // else schoolsList = this.state.schools.map((school) => <EducationContainer school={school} />);
    return (
      <Card style={{ padding: "0" }}>
        <Card.Title style={{ padding: "24px" }}>Work Experience</Card.Title>
        <Container style={{ maxHeight: "400px", overflowY: "scroll" }}>{}</Container>
        <NavDropdown.Divider style={{ margin: "0" }}></NavDropdown.Divider>
        <Button onClick={this.addSchool} className="BottomAddButton">Add Work Experience</Button>
      </Card>
    );
  }
}

export default WorkDetails;
