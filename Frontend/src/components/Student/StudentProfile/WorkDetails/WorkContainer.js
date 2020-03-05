import React from "react";
import axios from "axios";
// import cookie from 'react-cookies';
import DisplayWork from "./DisplayWork";
import EditWork from "./EditWork";


class WorkContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      job: this.props.job,
      editWasTriggered: false,
      errormessage: "",
    };
  }

  static getDerivedStateFromProps = (props) => ({ id: props.id })

  handleClick = (e) => {
    e.preventDefault();

    this.setState({ editWasTriggered: true });

    // this.getInfo();
  };

  companyNameChangeHandler = e => {
    const job = { ...this.state.job };
    job.companyname = e.target.value;
    this.setState({
      job,
    });
  };

  titleChangeHandler = e => {
    const job = { ...this.state.job };
    job.title = e.target.value;
    this.setState({
      job,
    });
  };

  startDateMonthChangeHandler = e => {
    const job = { ...this.state.job };
    job.startdatemonth = e.target.value;
    this.setState({
      job,
    });
  };

  startDateYearChangeHandler = e => {
    const job = { ...this.state.job };
    job.startdateyear = e.target.value;
    this.setState({
      job,
    });
  };

  endDateMonthChangeHandler = e => {
    const job = { ...this.state.job };
    job.enddatemonth = e.target.value;
    this.setState({
      job,
    });
  };

  endDateYearChangeHandler = e => {
    const job = { ...this.state.job };
    job.enddateyear = e.target.value;
    this.setState({
      job,
    });
  };

  descriptionChangeHandler = e => {
    const job = { ...this.state.job };
    job.description = e.target.value;
    this.setState({
      job,
    });
  };

  handleSave = (e) => {
    e.preventDefault();

    const wspatt = new RegExp("^ *$");
    if (this.state.job.enddatemonth === "" || wspatt.test(this.state.job.enddatemonth) || this.state.job.enddatemonth === undefined
    || this.state.job.enddateyear === "" || wspatt.test(this.state.job.enddateyear) || this.state.job.enddateyear === undefined) {
      this.setState({
        errormessage: "Complete end date must be entered."
      });
    } else if (this.state.job.startdateyear > this.state.job.enddateyear) {
      this.setState({
        errormessage: "End year can't be greater than start year."
      });
    } else {
      const data = {
        id: this.state.id,
        companyname: this.state.job.companyname,
        title: this.state.job.title,
        startdatemonth: this.state.job.startdatemonth,
        startdateyear: this.state.job.startdateyear,
        enddatemonth: this.state.job.enddatemonth,
        enddateyear: this.state.job.enddateyear,
        description: this.state.job.description,

      };

      axios.post("http://localhost:3001/student/workinfo", data)
        .then(response => {
          console.log(response);
          this.setState({
            editWasTriggered: false,
            errormessage: ""
          });
        })
        .catch(error => {
          console.log(error);
          this.setState({
            job: "",
          });
        });
    }
  };

  handleCancel = () => {
    this.setState({
      job: this.props.job,
      editWasTriggered: false
    });
  };

  handleDelete = (companyname, e) => {
    e.preventDefault();
    this.props.delete(companyname);
  };

  render() {
    let display = "";
    display = (
      <DisplayWork
        id={this.state.id}
        clicked={this.handleClick}
        job={this.state.job}
      />
    );

    if (this.state.editWasTriggered) {
      display = (
        <EditWork
          companynamechange={this.companyNameChangeHandler}
          titlechange={this.titleChangeHandler}
          startdatemonthchange={this.startDateMonthChangeHandler}
          startdateyearchange={this.startDateYearChangeHandler}
          enddatemonthchange={this.endDateMonthChangeHandler}
          enddateyearchange={this.endDateYearChangeHandler}
          descriptionchange={this.descriptionChangeHandler}
          save={this.handleSave}
          cancel={this.handleCancel}
          job={this.state.job}
          delete={this.handleDelete}
          errormessage={this.state.errormessage}
        />
      );
    }

    return <>{display}</>;
  }
}

export default WorkContainer;
