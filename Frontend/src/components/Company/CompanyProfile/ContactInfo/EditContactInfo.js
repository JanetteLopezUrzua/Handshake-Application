import React from 'react';
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const EditContactInfo = (props) =>
// const emailholder = (props.email === "") ? "Enter Email" : props.email;
// const phonenumholder = (props.phonenum === "") ? "Enter Phone Number" : props.phonenum;

  (
    <Card>
      <Row>
        <Col><Card.Title>Contact Information</Card.Title></Col>
        <Col />
      </Row>
      <Form.Group controlId="Email">
        <Form.Label className="labels">Email</Form.Label>
        <Form.Control onChange={props.emailchange} name="email" type="email" value={props.email} />
      </Form.Group>

      <Form.Group controlId="Phone">
        <Form.Label className="labels">Phone Number</Form.Label>
        <Form.Control onChange={props.phonechange} name="phone" type="tel" value={props.phonenum} />
      </Form.Group>
      <p className="errormessage">{props.errormessage}</p>
      <Card.Footer>
        <Button className="cancel" onClick={props.cancel}>Cancel</Button>
        <Button className="save" onClick={props.save}>Save</Button>
      </Card.Footer>
    </Card>
  );
export default EditContactInfo;
