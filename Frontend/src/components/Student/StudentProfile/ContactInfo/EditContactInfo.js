import React from 'react';
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const EditContactInfo = (props) => {
  const emailholder = (props.data.email === "") ? "Enter Email" : props.data.email;
  const phonenumholder = (props.data.phonenum === "") ? "Enter Phone Number" : props.data.phonenum;

  return (
    <Card>
      <Row>
        <Col><Card.Title>Contact Information</Card.Title></Col>
        <Col />
      </Row>
      <Row>
        <Col sm={6}>
          <Form.Group controlId="Email">
            <Form.Label className="labels">Email</Form.Label>
            <Form.Control onChange={props.emailchange} name="email" type="email" placeholder={emailholder} />
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group controlId="Phone">
            <Form.Label className="labels">Phone Number</Form.Label>
            <Form.Control onChange={props.phonechange} name="phone" type="tel" placeholder={phonenumholder} />
          </Form.Group>
        </Col>
      </Row>
      <Card.Footer>
        <Button className="cancel" onClick={props.cancel}>Cancel</Button>
        <Button className="save" onClick={props.save}>Save</Button>
      </Card.Footer>
    </Card>
  );
};

export default EditContactInfo;
