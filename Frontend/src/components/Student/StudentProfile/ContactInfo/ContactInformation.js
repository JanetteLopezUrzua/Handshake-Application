import React from "react";
import axios from "axios";
// import cookie from 'react-cookies';
import DisplayContactInfo from "./DisplayContactInfo";
import EditContactInfo from "./EditContactInfo";


class ContactInformation extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      email: "",
      phonenum: "",
      editWasTriggered: false
    };
  }

  static getDerivedStateFromProps = (props) => ({ id: props.id })

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    axios.get(`http://localhost:3001/student/contactinfo/${this.state.id}`)
      .then(response => {
        const info = response.data;

        const wspatt = new RegExp("^ *$");

        if (info.email === 'null' || wspatt.test(info.email)) {
          info.email = "";
        }
        if (info.phonenum === 'null' || wspatt.test(info.phonenum)) {
          info.phonenum = "";
        }

        this.setState({
          email: info.email,
          phonenum: info.phonenum,
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

  emailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
  };

  phoneChangeHandler = e => {
    this.setState({
      phonenum: e.target.value
    });
  };

  handleSave = (e) => {
    e.preventDefault();
    const data = {
      id: this.state.id,
      email: this.state.email,
      phonenum: this.state.phonenum,
    };

    axios.post("http://localhost:3001/student/contactinfo", data)
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
      email, phonenum, editWasTriggered
    } = this.state;

    let display = "";
    display = (
      <DisplayContactInfo
        clicked={this.handleClick}
        email={email}
        phonenum={phonenum}
      />
    );

    if (editWasTriggered) {
      display = (
        <EditContactInfo
          emailchange={this.emailChangeHandler}
          phonechange={this.phoneChangeHandler}
          save={this.handleSave}
          cancel={this.handleCancel}
          data={this.state}
        />
      );
    }

    return <>{display}</>;
  }
}

export default ContactInformation;
