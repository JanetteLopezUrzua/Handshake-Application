import React from 'react';
import Button from 'react-bootstrap/Button';


class DisplaySkills extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      skill: "",
    };
  }

  static getDerivedStateFromProps = (props) => ({ skill: props.skill })

  render() {
    return (
      <div id="skillbox">
        {this.state.skill}
        <Button variant="link" onClick={(e) => { this.props.handleDelete(this.state.skill, e); }} id="skillbutton">&#10006;</Button>
      </div>
    );
  }
}


export default DisplaySkills;
