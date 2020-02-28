import React from 'react';
import Button from 'react-bootstrap/Button';

const DisplaySkills = (props) => (
  <div id="skillbox">{props.skill}<Button variant="link" id="skillbutton">&#10006;</Button></div>
);

export default DisplaySkills;
