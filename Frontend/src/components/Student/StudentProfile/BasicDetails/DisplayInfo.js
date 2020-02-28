import React from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { MdEdit } from 'react-icons/md';

const DisplayInfo = (props) => {
  const name = (props.name === "") ? "No Name Entered" : props.name;
  const dob = (props.dob === "") ? "No Date of Birth Entered" : props.dob;
  const city = (props.city === "") ? "No City Entered" : props.city;
  const state = (props.state === "") ? "No State Entered" : props.state;
  const country = (props.country === "") ? "No Country Entered" : props.country;

  return (
    <Card>
      <Card.Title>Personal Information</Card.Title>
      <Button onClick={props.clicked}>
        <MdEdit />
      </Button>
      <Card.Subtitle>Name</Card.Subtitle>
      <Card.Text>{ name }</Card.Text>
      <Card.Subtitle>Date of Birth</Card.Subtitle>
      <Card.Text>{ dob }</Card.Text>
      <Card.Subtitle>City</Card.Subtitle>
      <Card.Text>{ city }</Card.Text>
      <Card.Subtitle>State</Card.Subtitle>
      <Card.Text>{ state }</Card.Text>
      <Card.Subtitle>Country</Card.Subtitle>
      <Card.Text>{ country }</Card.Text>
    </Card>
  );
};

export default DisplayInfo;
