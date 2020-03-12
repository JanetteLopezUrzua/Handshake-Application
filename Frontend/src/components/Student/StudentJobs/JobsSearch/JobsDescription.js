import React from 'react';
import "../../../components.css";
import Card from "react-bootstrap/Card";
import JobDescriptionDisplay from "./JobDescriptionDisplay";

class JobsDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job: "",
    };
  }

  static getDerivedStateFromProps = (props) => ({ job: props.job })

  render() {
    let job = "";
    if (this.state.job === "" || this.state.job === undefined) job = "";
    else job = (<JobDescriptionDisplay job={this.state.job} />);

    return (
      <Card style={{
        marginLeft: "0", borderBottomLeftRadius: "0", borderTopLeftRadius: "0", maxHeight: "450px", height: "450", overflowY: "scroll"
      }}
      >
        { job }

      </Card>
    );
  }
}

export default JobsDescription;
