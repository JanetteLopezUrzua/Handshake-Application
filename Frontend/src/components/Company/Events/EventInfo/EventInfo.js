import React from "react";
import axios from "axios";
import DisplayEventInfo from "./DisplayEventInfo";
import EditEventInfo from "./EditEventInfo";


class EventInfo extends React.Component {
  constructor() {
    super();

    this.state = {
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
      eligibilityoption: "",
      eligibility: "",
      editWasTriggered: false,
      errormessage: "",
      photo: "",
      name: "",
    };
  }

  static getDerivedStateFromProps = (props) => ({ event_id: props.event_id })

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    axios.get(`http://localhost:3001/company/eventinfo/${this.state.event_id}`)
      .then(response => {
        const info = response.data;

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
          photo: info.photo,
          name: info.name,
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

  eligibilityOptionChangeHandler = e => {
    this.setState({
      eligibilityoption: e.target.value,
      eligibility: e.target.value,
    });
  };

  eligibilityChangeHandler = e => {
    this.setState({
      eligibility: e.target.value
    });
  };

  handleSave = (e) => {
    e.preventDefault();
    console.log("SSSSSSAAAAAAVVVVEEEEEEEE");
    const {
      title, dayofweek, month, day, year, starttime, startdaytime, endtime, enddaytime, timezone, location, eligibility
    } = this.state;

    let err = "";
    console.log(title);
    console.log(err);
    const wspatt = new RegExp("^ *$");
    if (title === "" || wspatt.test(title)) {
      err = "Required. Enter Title.";
    } else if (dayofweek === "" || wspatt.test(dayofweek)) {
      err = "Required. Select Day of Week.";
    } else if (month === "" || wspatt.test(month)) {
      err = "Required. Select Month.";
    } else if (day === "" || wspatt.test(day)) {
      err = "Required. Select Day.";
    } else if (year === "" || wspatt.test(year)) {
      err = "Required. Select Year.";
    } else if (starttime === "" || wspatt.test(starttime)) {
      err = "Required. Select Start Time.";
    } else if (startdaytime === "" || wspatt.test(startdaytime)) {
      err = "Required. Select Start Time AM or PM.";
    } else if (endtime === "" || wspatt.test(endtime)) {
      err = "Required. Select End Time.";
    } else if (enddaytime === "" || wspatt.test(enddaytime)) {
      err = "Required. Select End Time AM or PM.";
    } else if (timezone === "" || wspatt.test(timezone)) {
      err = "Required. Select time Zone.";
    } else if (location === "" || wspatt.test(location)) {
      err = "Required. Enter Location.";
    } else if (eligibility === "" || wspatt.test(eligibility)) {
      err = "Required. Enter Eligibility.";
    }

    if (err === "") {
      const data = {
        event_id: this.state.event_id,
        bannerphoto: this.state.bannerphoto,
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
        eligibility: this.state.eligibility,
        description: this.state.description
      };

      axios.post("http://localhost:3001/company/eventinfo", data)
        .then(response => {
          console.log(response);
          this.setState({ editWasTriggered: false });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.setState({
        errormessage: err,
      });
    }
  };

  handleCancel = () => {
    this.setState({ editWasTriggered: false });
  };

  render() {
    const {
      title, dayofweek, month, day, year, starttime, startdaytime, endtime, enddaytime, timezone, location, eligibility, editWasTriggered, photo, name
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
        photo={photo}
        name={name}
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
          locationchange={this.locationChangeHandler}
          eligibilityoptionchange={this.eligibilityOptionChangeHandler}
          eligibilitychange={this.eligibilityChangeHandler}
          save={this.handleSave}
          cancel={this.handleCancel}
          eligibilityoption={this.state.eligibilityoption}
          errormessage={this.state.errormessage}
          data={this.state}
        />
      );
    }

    return <>{display}</>;
  }
}

export default EventInfo;
