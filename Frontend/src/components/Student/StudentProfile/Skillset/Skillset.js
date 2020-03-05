import React from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
// import cookie from 'react-cookies';
import DisplaySkills from "./DisplaySkills";
import EditSkills from "./EditSkills";


class Skillset extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      skills: [],
      skill: "",
      errormessage: "",
      value: "",
    };
  }

  static getDerivedStateFromProps = (props) => ({ id: props.id })

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    axios.get(`http://localhost:3001/student/skill/${this.state.id}`)
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
      value: e.target.value
    });
  };


  handleSave = (e) => {
    e.preventDefault();

    // skill has whitespace only
    const wspatt = new RegExp("^ *$");

    if (this.state.skill === undefined || wspatt.test(this.state.skill)) {
      this.setState({
        skill: "",
      });
    } else {
      const data = {
        id: this.state.id,
        skills: this.state.skills,
        skill: this.state.skill,
      };

      axios.post("http://localhost:3001/student/skill", data)
        .then(response => {
          console.log(response);
          this.setState({
            skill: "",
            skills: [...data.skills, data.skill],
            errormessage: "",
            value: "",
          });
        })
        .catch(error => {
          console.log(error);
          this.setState({
            skill: "",
            errormessage: error.response.data,
            value: "",
          });
        });
    }
  };

  handleDelete = (skill, e) => {
    e.preventDefault();

    axios.delete("http://localhost:3001/student/skill/delete", { data: { id: this.state.id, skill } })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

    this.getInfo();
  };

  render() {
    let skillsList = "";
    if (this.state.skills === undefined || this.state.skills.length === 0) skillsList = "";
    else skillsList = this.state.skills.map((skill) => <DisplaySkills id={this.state.id} skill={skill} handleDelete={this.handleDelete} />);
    return (
      <Card>
        <Card.Title>Skills</Card.Title>
        <Container style={{ maxHeight: "200px", overflowY: "scroll" }}>{skillsList}</Container>
        <EditSkills
          id={this.state.id}
          skillschange={this.skillsChangeHandler}
          save={this.handleSave}
          value={this.state.value}
        />
        <p className="errormessage">{this.state.errormessage}</p>
      </Card>
    );
  }
}

export default Skillset;
