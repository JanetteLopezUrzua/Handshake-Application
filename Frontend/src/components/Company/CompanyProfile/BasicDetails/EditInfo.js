import React from 'react';
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const EditInfo = (props) => (
  <Card>
    <Row>
      <Col><Card.Title>Company Information</Card.Title></Col>
      <Col />
    </Row>
    <Form.Group controlId="Location">
      <Form.Label className="labels">Location</Form.Label>
      <Form.Control style={{ textTransform: "capitalize" }} onChange={props.locationchange} name="location" type="text" value={props.data.location} />
    </Form.Group>
    <Form.Group controlId="Description">
      <Form.Label className="labels">Description</Form.Label>
      <Form.Control as="textarea" rows="5" onChange={props.descriptionchange} name="description" type="text" value={props.data.description} />
    </Form.Group>
    <Card.Footer>
      <Button className="cancel" onClick={props.cancel}>Cancel</Button>
      <Button className="save" onClick={props.save}>Save</Button>
    </Card.Footer>
  </Card>
);
export default EditInfo;
