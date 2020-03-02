import React from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import cookie from 'react-cookies';
import NavDropdown from "react-bootstrap/NavDropdown";
import EducationContainer from "./EducationContainer";
import EditEducation from "./EditEducation";


class EducationDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      schools: [],
      newform: false,
      message: "",
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

  closenewform=(e) => {
    e.preventDefault();

    this.setState({
      newform: false,
    });
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
    console.log(primary);

    if (this.state.schools === undefined || this.state.schools.length === 0) schoolsList = "";
    else schoolsList = primary.map((school) => <EducationContainer id={this.state.id} school={school} />);

    if (this.state.newform === false) newschoolform = "";
    else newschoolform = <EditEducation />;

    return (
      <Card style={{ padding: "0" }}>
        <Card.Title style={{ paddingLeft: "24px", paddingTop: "24px" }}>Education</Card.Title>
        <Form.Label style={{ color: "blue", padding: "0 24px" }}>{this.state.message}</Form.Label>
        <Container style={{ maxHeight: "400px", overflowY: "scroll" }}>{schoolsList}</Container>
        {newschoolform}
        <NavDropdown.Divider style={{ margin: "0" }}></NavDropdown.Divider>
        <Button onClick={this.addSchool} className="BottomAddButton">Add School</Button>
      </Card>
    );
  }
}

export default EducationDetails;
