import React from 'react';
import Button from 'react-bootstrap/Button';

const DisplaySkills = (props) => (
  <div id="skillbox">{props.skill}<Button id="skillbutton"><p id="skillx">x</p></Button></div>
);

export default DisplaySkills;
