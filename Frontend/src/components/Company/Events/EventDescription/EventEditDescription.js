import React from 'react';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const EventEditDescription = (props) => (
  <Card>
    <Form.Group controlId="description">
      <Form.Label>Description</Form.Label>
      <Form.Control as="textarea" rows="10" onChange={props.descriptionchange} name="description" type="text" value={props.data.description} autoFocus />
    </Form.Group>
    <Card.Footer>
      <Button className="cancel" onClick={props.cancel}>Cancel</Button>
      <Button className="save" onClick={props.save}>Save</Button>
    </Card.Footer>
  </Card>
);

export default EventEditDescription;
