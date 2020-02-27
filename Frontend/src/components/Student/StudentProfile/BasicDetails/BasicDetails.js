import React from "react";
import axios from "axios";
import cookie from 'react-cookies';
import DisplayInfo from "./DisplayInfo";
import EditInfo from "./EditInfo";


class BasicDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      id: cookie.load('id'),
      name: "",
      dob: "",
      city: "",
      state: "",
      country: "",
      editWasTriggered: false
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    const { id } = this.state;
    axios.get(`http://localhost:3001/student/personalinfo/${id}`)
      .then(response => {
        const info = response.data;

        if (info.name === 'null') {
          info.name = "";
        }
        if (info.dob === 'null') {
          info.dob = "";
        }
        if (info.city === 'null') {
          info.city = "";
        }
        if (info.state === 'null') {
          info.state = "";
        }
        if (info.country === 'null') {
          info.country = "";
        }

        this.setState({
          name: info.name,
          dob: info.dob,
          city: info.city,
          state: info.state,
          country: info.country
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleClick = () => {
    console.log("button was pressed!!!!");
    this.setState({ editWasTriggered: true });
  };

  nameChangeHandler = e => {
    this.setState({
      name: e.target.value
    });
  };

  dobChangeHandler = e => {
    this.setState({
      dob: e.target.value
    });
  };

  cityChangeHandler = e => {
    this.setState({
      city: e.target.value
    });
  };

  stateChangeHandler = e => {
    this.setState({
      state: e.target.value
    });
  };

  countryChangeHandler = e => {
    this.setState({
      country: e.target.value
    });
  };

  handleSave = () => {
    const data = {
      id: this.state.id,
      name: this.state.name,
      dob: this.state.dob,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
    };

    axios.post("http://localhost:3001/student/personalinfo/", data)
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
  };

  render() {
    const {
      name, dob, city, state, country, editWasTriggered
    } = this.state;

    let display = "";
    display = (
      <DisplayInfo
        clicked={this.handleClick}
        name={name}
        dob={dob}
        city={city}
        state={state}
        country={country}
      />
    );

    if (editWasTriggered) {
      display = (
        <EditInfo
          namechange={this.nameChangeHandler}
          dobchange={this.dobChangeHandler}
          citychange={this.cityChangeHandler}
          statechange={this.stateChangeHandler}
          countrychange={this.countryChangeHandler}
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
