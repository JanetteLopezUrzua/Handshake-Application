import React from "react";
import axios from "axios";
import DisplayJobInfo from "./DisplayJobInfo";
import EditJobInfo from "./EditJobInfo";

class JobInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      company_id: "",
      job_id: "",
      title: "",
      deadlinemonth: "",
      deadlineday: "",
      deadlineyear: "",
      deadlinetime: "",
      deadlinedaytime: "",
      location: "",
      salary: "",
      salarytime: "",
      description: "",
      category: "",
      posteddate: "",
      company_name: "",
      editWasTriggered: false,
      errormessage: "",
    };
  }

  static getDerivedStateFromProps = (props) => ({ job_id: props.job_id })

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    axios.get(`http://localhost:3001/company/jobinfo/${this.state.job_id}`)
      .then(response => {
        const info = response.data;

        this.setState({
          company_id: info.company_id.toString(),
          title: info.title,
          deadlinemonth: info.deadlinemonth,
          deadlineday: info.deadlineday,
          deadlineyear: info.deadlineyear,
          deadlinetime: info.deadlinetime,
          deadlinedaytime: info.deadlinedaytime,
          location: info.location,
          salary: info.salary,
          salarytime: info.salarytime,
          description: info.description,
          category: info.category,
          posteddate: info.posteddate,
          company_name: info.company_name,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleClick = (e) => {
    e.preventDefault();
    // console.log("button was pressed!!!!");
    this.setState({ editWasTriggered: true });
  };

  titleChangeHandler = e => {
    this.setState({
      title: e.target.value
    });
  };

  deadlineMonthChangeHandler = e => {
    this.setState({
      deadlinemonth: e.target.value
    });
  };

  deadlineDayChangeHandler = e => {
    this.setState({
      deadlineday: e.target.value
    });
  };

  deadlineYearChangeHandler = e => {
    this.setState({
      deadlineyear: e.target.value
    });
  };

  deadlineTimeChangeHandler = e => {
    this.setState({
      deadlinetime: e.target.value
    });
  };

  deadlineDayTimeChangeHandler = e => {
    this.setState({
      deadlinedaytime: e.target.value
    });
  };

  locationChangeHandler = e => {
    this.setState({
      location: e.target.value
    });
  };

  salaryChangeHandler = e => {
    this.setState({
      salary: e.target.value
    });
  };

  salaryTimeChangeHandler = e => {
    this.setState({
      salarytime: e.target.value,
    });
  };

  descriptionChangeHandler = e => {
    this.setState({
      description: e.target.value
    });
  };

  categoryChangeHandler = e => {
    this.setState({
      category: e.target.value
    });
  };

  handleSave = (e) => {
    e.preventDefault();

    const {
      title, deadlinemonth, deadlineday, deadlineyear, deadlinetime, deadlinedaytime, location, salary, salarytime, description, category
    } = this.state;

    let err = "";

    const wspatt = new RegExp("^ *$");
    if (title === "" || wspatt.test(title)) {
      err = "Required. Enter Title.";
    } else if (deadlinemonth === "" || wspatt.test(deadlinemonth) || deadlineday === "" || wspatt.test(deadlineday) || deadlineyear === "" || wspatt.test(deadlineyear)) {
      err = "Required. Select Complete Deadline Date.";
    } else if (deadlinetime === "" || wspatt.test(deadlinetime) || deadlinedaytime === "" || wspatt.test(deadlinedaytime)) {
      err = "Required. Select Complete Deadline Time.";
    } else if (location === "" || wspatt.test(location)) {
      err = "Required. Enter Location.";
    } else if (salary === "" || wspatt.test(salary) || salarytime === "" || wspatt.test(salarytime)) {
      err = "Required. Select Complete Salary Information.";
    } else if (category === "" || wspatt.test(category)) {
      err = "Required. Select Job Category.";
    } else if (description === "" || wspatt.test(description)) {
      err = "Required. Enter Description.";
    }

    if (err === "") {
      console.log(this.state.salary);
      const data = {
        job_id: this.state.job_id,
        company_id: this.state.company_id,
        title: this.state.title,
        deadlinemonth: this.state.deadlinemonth,
        deadlineday: this.state.deadlineday,
        deadlineyear: this.state.deadlineyear,
        deadlinetime: this.state.deadlinetime,
        deadlinedaytime: this.state.deadlinedaytime,
        location: this.state.location,
        salary: this.state.salary,
        salarytime: this.state.salarytime,
        description: this.state.description,
        category: this.state.category,
      };

      axios.post("http://localhost:3001/company/jobinfo", data)
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
      title, deadlinemonth, deadlineday, deadlineyear, deadlinetime, deadlinedaytime, location, salary, salarytime, description, category, editWasTriggered
    } = this.state;

    let display = "";
    display = (
      <DisplayJobInfo
        company_id={this.state.company_id}
        job_id={this.state.job_id}
        clicked={this.handleClick}
        title={title}
        deadlinemonth={deadlinemonth}
        deadlineday={deadlineday}
        deadlineyear={deadlineyear}
        deadlinetime={deadlinetime}
        deadlinedaytime={deadlinedaytime}
        location={location}
        salary={salary}
        salarytime={salarytime}
        description={description}
        category={category}
        posteddate={this.state.posteddate}
        company_name={this.state.company_name}
      />
    );

    if (editWasTriggered) {
      display = (
        <EditJobInfo
          titlechange={this.titleChangeHandler}
          deadlinemonthchange={this.deadlineMonthChangeHandler}
          deadlinedaychange={this.deadlineDayChangeHandler}
          deadlineyearchange={this.deadlineYearChangeHandler}
          deadlinetimechange={this.deadlineTimeChangeHandler}
          deadlinedaytimechange={this.deadlineDayTimeChangeHandler}
          locationchange={this.locationChangeHandler}
          salarychange={this.salaryChangeHandler}
          salarytimechange={this.salaryTimeChangeHandler}
          descriptionchange={this.descriptionChangeHandler}
          categorychange={this.categoryChangeHandler}
          save={this.handleSave}
          cancel={this.handleCancel}
          errormessage={this.state.errormessage}
          data={this.state}
        />
      );
    }

    return <>{display}</>;
  }
}

export default JobInfo;
