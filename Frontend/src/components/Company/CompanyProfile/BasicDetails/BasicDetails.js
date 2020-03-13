import React from "react";
import axios from "axios";
import DisplayInfo from "./DisplayInfo";
import EditInfo from "./EditInfo";

class BasicDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      location: "",
      description: "",
      editWasTriggered: false
    };
  }

  static getDerivedStateFromProps = props => ({ id: props.id });

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    axios
      .get(`http://localhost:3001/company/personalinfo/${this.state.id}`)
      .then(response => {
        const info = response.data;

        const wspatt = new RegExp("^ *$");

        if (info.name === null || wspatt.test(info.name)) {
          info.name = "";
        }
        if (info.location === null || wspatt.test(info.location)) {
          info.location = "";
        }
        if (info.description === null || wspatt.test(info.description)) {
          info.description = "";
        }

        this.setState({
          location: info.location,
          description: info.description
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleClick = e => {
    e.preventDefault();
    console.log("button was pressed!!!!");
    this.setState({ editWasTriggered: true });

    // this.getInfo();
  };

  locationChangeHandler = e => {
    this.setState({
      location: e.target.value
    });
  };

  descriptionChangeHandler = e => {
    this.setState({
      description: e.target.value
    });
  };

  handleSave = e => {
    e.preventDefault();
    const data = {
      id: this.state.id,
      location: this.state.location,
      description: this.state.description
    };

    axios
      .post("http://localhost:3001/company/personalinfo", data)
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
    this.getInfo();
  };

  render() {
    const { location, description, editWasTriggered } = this.state;

    let display = "";
    display = (
      <DisplayInfo
        id={this.state.id}
        clicked={this.handleClick}
        location={location}
        description={description}
      />
    );

    if (editWasTriggered) {
      display = (
        <EditInfo
          locationchange={this.locationChangeHandler}
          descriptionchange={this.descriptionChangeHandler}
          save={this.handleSave}
          cancel={this.handleCancel}
          data={this.state}
        />
      );
    }

    return <>{display}</>;
  }
}

export default BasicDetails;
