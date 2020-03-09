import React from "react";
import axios from "axios";
import DisplayEventInfo from "./DisplayEventInfo";
import EditEventInfo from "./EditEventInfo";


class EventInfo extends React.Component {
  constructor() {
    super();

    this.state = {
      company_id: "",
      event_id: "",
      title: "",
      dayofweek: "",
      month: "",
      day: "",
      year: "",
      starttime: "",
      startdaytime: "",
      endtime: "",
      enddaytime: "",
      timezone: "",
      location: "",
      eligibility: "",
      editWasTriggered: false
    };
  }

  static getDerivedStateFromProps = (props) => ({ company_id: props.company_id, event_id: props.event_id })

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    const data = {
      params: {
        event_id: this.state.event_id,
        company_id: this.state.company_id,
      }
    };

    axios.get(`http://localhost:3001/company/eventinfo/`, data)
      .then(response => {
        const info = response.data;

        const wspatt = new RegExp("^ *$");

        if (info.title === null || wspatt.test(info.title)) {
          info.title = "";
        }
        if (info.dayofweek === null || wspatt.test(info.dayofweek)) {
          info.dayofweek = "";
        }
        if (info.month === null || wspatt.test(info.month)) {
          info.month = "";
        }
        if (info.day === null || wspatt.test(info.day)) {
          info.day = "";
        }
        if (info.year === null || wspatt.test(info.year)) {
          info.year = "";
        }
        if (info.starttime === null || wspatt.test(info.starttime)) {
          info.starttime = "";
        }
        if (info.startdaytime === null || wspatt.test(info.startdaytime)) {
          info.startdaytime = "";
        }
        if (info.endtime === null || wspatt.test(info.endtime)) {
          info.endtime = "";
        }
        if (info.enddaytime === null || wspatt.test(info.enddaytime)) {
          info.enddaytime = "";
        }
        if (info.timezone === null || wspatt.test(info.timezone)) {
          info.timezone = "";
        }
        if (info.location === null || wspatt.test(info.location)) {
          info.location = "";
        }
        if (info.eligibility === null || wspatt.test(info.eligibility)) {
          info.eligibility = "";
        }

        this.setState({
          title: info.title,
          dayofweek: info.dayofweek,
          month: info.month,
          day: info.day,
          year: info.year,
          starttime: info.starttime,
          startdaytime: info.startdaytime,
          endtime: info.endtime,
          enddaytime: info.enddaytime,
          timezone: info.timezone,
          location: info.location,
          eligibility: info.eligibility,
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


  titleChangeHandler = e => {
    this.setState({
      title: e.target.value
    });
  };

  dayOfWeekChangeHandler = e => {
    this.setState({
      dayofweek: e.target.value
    });
  };

  monthChangeHandler = e => {
    this.setState({
      month: e.target.value
    });
  };

  dayChangeHandler = e => {
    this.setState({
      day: e.target.value
    });
  };

  yearChangeHandler = e => {
    this.setState({
      year: e.target.value
    });
  };

  startTimeChangeHandler = e => {
    this.setState({
      starttime: e.target.value
    });
  };

  startDayTimeChangeHandler = e => {
    this.setState({
      startdaytime: e.target.value
    });
  };

  endTimeChangeHandler = e => {
    this.setState({
      endtime: e.target.value
    });
  };

  endDayTimeChangeHandler = e => {
    this.setState({
      enddaytime: e.target.value
    });
  };

  timeZoneChangeHandler = e => {
    this.setState({
      timezone: e.target.value
    });
  };

  locationChangeHandler = e => {
    this.setState({
      location: e.target.value
    });
  };

  eligibilityChangeHandler = e => {
    this.setState({
      eligibility: e.target.value
    });
  };

  handleSave = (e) => {
    e.preventDefault();
    const data = {
      event_id: this.state.event_id,
      title: this.state.title,
      dayofweek: this.state.dayofweek,
      month: this.state.month,
      day: this.state.day,
      year: this.state.year,
      starttime: this.state.starttime,
      startdaytime: this.state.startdaytime,
      endtime: this.state.endtime,
      enddaytime: this.state.enddaytime,
      timezone: this.state.timezone,
      location: this.state.location,
      eligibility: this.state.eligibility
    };

    axios.post("http://localhost:3001/company/eventinfo", data)
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
      title, dayofweek, month, day, year, starttime, startdaytime, endtime, enddaytime, timezone, location, eligibility, editWasTriggered
    } = this.state;

    let display = "";
    display = (
      <DisplayEventInfo
        event_id={this.state.event_id}
        clicked={this.handleClick}
        title={title}
        dayofweek={dayofweek}
        month={month}
        day={day}
        year={year}
        starttime={starttime}
        startdaytime={startdaytime}
        endtime={endtime}
        enddaytime={enddaytime}
        timezone={timezone}
        location={location}
        eligibility={eligibility}
      />
    );

    if (editWasTriggered) {
      display = (
        <EditEventInfo
          titlechange={this.titleChangeHandler}
          dayofweekchange={this.dayOfWeekChangeHandler}
          monthchange={this.monthChangeHandler}
          daychange={this.dayChangeHandler}
          yearchange={this.yearChangeHandler}
          starttimechange={this.startTimeChangeHandler}
          startdaytimechange={this.startDayTimeChangeHandler}
          endtimechange={this.endTimeChangeHandler}
          enddaytimechange={this.endDayTimeChangeHandler}
          timezonechange={this.timeZoneChangeHandler}
          location={this.locationChangeHandler}
          eligibility={this.eligibilityChangeHandler}
          save={this.handleSave}
          cancel={this.handleCancel}
          data={this.state}
        />
      );
    }

    return <>{display}</>;
  }
}

export default EventInfo;
