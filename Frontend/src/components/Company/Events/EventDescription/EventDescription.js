import React from "react";
import axios from "axios";
// import cookie from 'react-cookies';
import EventDisplayDescription from "./EventDisplayDescription";
import EventEditDescription from "./EventEditDescription";


class EventDescription extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event_id: "",
      description: "",
      editWasTriggered: false,
      company_id: ""
    };
  }

  static getDerivedStateFromProps = (props) => ({ event_id: props.event_id })

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    axios.get(`http://localhost:3001/company/eventdescription/${this.state.event_id}`)
      .then(response => {
        const info = response.data;

        // description has whitespace only
        const wspatt = new RegExp("^ *$");

        if (info.description === undefined || wspatt.test(info.description)) {
          this.setState({
            description: "",
            company_id: info.company_id.toString()
          });
        } else {
          this.setState({
            description: info.description,
            company_id: info.company_id.toString()
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

  descriptionChangeHandler = e => {
    this.setState({
      description: e.target.value
    });
  };

  handleSave = (e) => {
    e.preventDefault();
    // description has whitespace only
    const wspatt = new RegExp("^ *$");

    if (this.state.description === undefined || wspatt.test(this.state.description)) {
      this.setState({
        description: "",
      });
    }

    const data = {
      event_id: this.state.event_id,
      description: this.state.description,
    };

    axios.post("http://localhost:3001/company/eventdescription", data)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

    this.setState({ editWasTriggered: false });
  };

  handleCancel = (e) => {
    e.preventDefault();
    this.setState({
      description: "",
      editWasTriggered: false
    });
  };

  render() {
    const {
      description, editWasTriggered,
    } = this.state;

    let display = "";
    display = (
      <EventDisplayDescription
        clicked={this.handleClick}
        description={description}
        company_id={this.state.company_id}
      />
    );

    if (editWasTriggered) {
      display = (
        <EventEditDescription
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

export default EventDescription;
