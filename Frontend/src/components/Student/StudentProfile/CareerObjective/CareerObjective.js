import React from "react";
import axios from "axios";
// import cookie from 'react-cookies';
import DisplayObjective from "./DisplayObjective";
import EditObjective from "./EditObjective";


class CareerObjective extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      objective: "",
      editWasTriggered: false,
    };
  }

  static getDerivedStateFromProps = (props) => ({ id: props.id })

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    axios.get(`http://localhost:3001/student/careerobjective/${this.state.id}`)
      .then(response => {
        const info = response.data;

        // objective has whitespace only
        const wspatt = new RegExp("^ *$");

        if (info.objective === undefined || wspatt.test(info.objective)) {
          this.setState({
            objective: "",
          });
        } else {
          this.setState({
            objective: info.objective,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleClick = (e) => {
    e.preventDefault();
    console.log("button was pressed!!!!");
    this.setState({ editWasTriggered: true });
  };

  objectiveChangeHandler = e => {
    this.setState({
      objective: e.target.value
    });
  };

  handleSave = (e) => {
    e.preventDefault();
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

    this.setState({ editWasTriggered: false });

    // this.getInfo();
  };

  handleCancel = (e) => {
    e.preventDefault();
    this.setState({
      editWasTriggered: false
    });
  };

  render() {
    const {
      objective, editWasTriggered
    } = this.state;

    let display = "";
    display = (
      <DisplayObjective
        id={this.state.id}
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
