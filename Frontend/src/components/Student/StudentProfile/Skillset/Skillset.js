import React from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import cookie from 'react-cookies';
import DisplaySkills from "./DisplaySkills";
import EditSkills from "./EditSkills";


class Skillset extends React.Component {
  constructor() {
    super();

    this.state = {
      id: cookie.load('id'),
      skills: [],
      skill: "",
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    const { id } = this.state;
    axios.get(`http://localhost:3001/student/skill/${id}`)
      .then(response => {
        const info = response.data;

        this.setState({
          skills: info.skills,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  skillsChangeHandler = e => {
    this.setState({
      skill: e.target.value,
    });
  };

  handleSave = () => {
    const data = {
      id: this.state.id,
      skill: this.state.skill,
    };

    axios.post("http://localhost:3001/student/skill", data)
      .then(response => {
        console.log(response);
        this.setState({
          skill: "",
        });
      })
      .catch(error => {
        console.log(error);
      });

    this.getInfo();
  };

  //   handleClick = (skill) => {
  //     const data = {
  //       id: this.state.id,
  //       skill,
  //     };
  //     axios.delete(`http://localhost:3001/student/skill/delete`, data)
  //       .then(response => {
  //         console.log(response);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   };

  render() {
    let skillsList = "";
    if (this.state.skills.length === 0) skillsList = "";
    else skillsList = this.state.skills.map((skill) => <DisplaySkills skill={skill} />);
    return (
      <Card>
        <Card.Title>Skills</Card.Title>
        <Container>{skillsList}</Container>
        <EditSkills
          skillschange={this.skillsChangeHandler}
          save={this.handleSave}
        />
      </Card>
    );
  }
}

export default Skillset;
