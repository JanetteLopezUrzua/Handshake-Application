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
      editWasTriggered: false,
      errormessage: "",
    };
  }

  static getDerivedStateFromProps = (props) => ({ id: props.id })

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    axios.get(`http://localhost:3001/company/contactinfo/${this.state.id}`)
      .then(response => {
        const info = response.data;

        const wspatt = new RegExp("^ *$");

        if (info.email === null || wspatt.test(info.email)) {
          info.email = "";
        }
        if (info.phonenum === null || wspatt.test(info.phonenum)) {
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

    const numbers = this.state.phonenum.replace(/\D/g, '');

    // Check that email input is valid
    const emailpatt = new RegExp("\\S+@\\S+\\.\\S+");
    const wspatt = new RegExp("^ *$");

    if (wspatt.test(this.state.email)) {
      this.setState({
        errormessage: "Required. Enter Email."
      });
    } else if (!emailpatt.test(this.state.email)) {
      this.setState({
        errormessage: "Email is not valid."
      });
    } else if (numbers.length > 10 || numbers.length < 10) {
      this.setState({
        errormessage: "Please enter a 10 digit phone number."
      });
    } else {
      const data = {
        id: this.state.id,
        email: this.state.email,
        phonenum: numbers,
      };

      axios.post("http://localhost:3001/company/contactinfo", data)
        .then(response => {
          console.log(response);
          this.setState({
            email: data.email,
            phonenum: data.phonenum,
          });
        })
        .catch(error => {
          console.log(error);
        });

      this.setState({ editWasTriggered: false });
    }
  };

  handleCancel = () => {
    this.setState({
      errormessage: "",
      editWasTriggered: false
    });
    this.getInfo();
  };

  render() {
    const {
      email, phonenum, editWasTriggered, errormessage
    } = this.state;

    let display = "";
    display = (
      <DisplayContactInfo
        id={this.state.id}
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
          email={email}
          phonenum={phonenum}
          errormessage={errormessage}
        />
      );
    }

    return <>{display}</>;
  }
}

export default ContactInformation;
