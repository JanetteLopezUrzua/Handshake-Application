import React from "react";
import axios from "axios";
import cookie from 'react-cookies';
import DisplayObjective from "./DisplayObjective";
import EditObjective from "./EditObjective";


class CareerObjective extends React.Component {
  constructor() {
    super();

    this.state = {
      id: cookie.load('id'),
      objective: "",
      editWasTriggered: false,
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    const { id } = this.state;
    axios.get(`http://localhost:3001/student/careerobjective/${id}`)
      .then(response => {
        const info = response.data;

        this.setState({
          objective: info.objective,
        });
      })
      .catch(error => {
        console.log(error);
      });

    if (this.state.objective === "" || this.state.objective === undefined) {
      this.setState({ editWasTriggered: true });
    }
  }

  handleClick = () => {
    console.log("button was pressed!!!!");
    this.setState({ editWasTriggered: true });
  };

  objectiveChangeHandler = e => {
    this.setState({
      objective: e.target.value
    });
  };

  handleSave = () => {
    // objective has whitespace only
    const wspatt = new RegExp("^ *$");

    if (this.state.objective === undefined || wspatt.test(this.state.objective)) {
      this.setState({
        objective: "",
      });
    }

    const data = {
      id: this.state.id,
      objective: this.state.objective,
    };

    axios.post("http://localhost:3001/student/careerobjective", data)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });


    if (this.state.objective === "") {
      this.setState({ editWasTriggered: true });
    } else this.setState({ editWasTriggered: false });

    this.getInfo();
  };

  handleCancel = () => {

  };

  render() {
    const {
      objective, editWasTriggered
    } = this.state;

    let display = "";
    display = (
      <DisplayObjective
        clicked={this.handleClick}
        objective={objective}
      />
    );

    if (editWasTriggered) {
      display = (
        <EditObjective
          objectivechange={this.objectiveChangeHandler}
          save={this.handleSave}
          cancel={this.handleCancel}
          data={this.state}
        />
      );
    }

    return <>{display}</>;
  }
}

export default CareerObjective;
