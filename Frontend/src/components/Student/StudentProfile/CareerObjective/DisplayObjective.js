import React from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { MdEdit } from 'react-icons/md';

const DisplayObjective = (props) => (
  <Card>
    <Card.Title>My Journey</Card.Title>
    <Button onClick={props.clicked}>
      <MdEdit />
      <Card.Subtitle></Card.Subtitle>
      <Card.Text>{ props.objective }</Card.Text>
    </Button>
  </Card>
);

export default DisplayObjective;
