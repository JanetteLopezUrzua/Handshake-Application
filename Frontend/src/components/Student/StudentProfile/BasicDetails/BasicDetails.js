import React from "react";
import axios from "axios";
// import cookie from 'react-cookies';
import DisplayInfo from "./DisplayInfo";
import EditInfo from "./EditInfo";


class BasicDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      name: "",
      dob: "",
      city: "",
      state: "",
      country: "",
      editWasTriggered: false
    };
  }

  static getDerivedStateFromProps = (props) => ({ id: props.id })

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    axios.get(`http://localhost:3001/student/personalinfo/${this.state.id}`)
      .then(response => {
        const info = response.data;

        const wspatt = new RegExp("^ *$");

        if (info.name === null || wspatt.test(info.name)) {
          info.name = "";
        }
        if (info.dob === null || wspatt.test(info.dob)) {
          info.dob = "";
        }
        if (info.city === null || wspatt.test(info.city)) {
          info.city = "";
        }
        if (info.state === null || wspatt.test(info.state)) {
          info.state = "";
        }
        if (info.country === null || wspatt.test(info.country)) {
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

  handleClick = (e) => {
    e.preventDefault();
    console.log("button was pressed!!!!");
    this.setState({ editWasTriggered: true });

    // this.getInfo();
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

  handleSave = (e) => {
    e.preventDefault();
    const data = {
      id: this.state.id,
      name: this.state.name,
      dob: this.state.dob,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
    };

    axios.post("http://localhost:3001/student/personalinfo", data)
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
