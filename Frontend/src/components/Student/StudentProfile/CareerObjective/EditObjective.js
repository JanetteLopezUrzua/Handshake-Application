import React from 'react';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const EditInfo = (props) => {
  const subtitle = "What are you passionate about? What are you looking for on Handshake? What are your experiences or skills?";

  return (
    <Card>
      <Card.Title>My Journey</Card.Title>
      <Form>
        <Form.Group controlId="Name">
          <Form.Label style={{ color: "blue" }}>{subtitle}</Form.Label>
          <Form.Control as="textarea" rows="3" onChange={props.objectivechange} name="objective" type="text" placeholder="Type your career objective..." autoFocus />
        </Form.Group>
      </Form>
      <Card.Footer>
        <Button className="cancel" onClick={props.cancel}>Cancel</Button>
        <Button className="save" onClick={props.save}>Save</Button>
      </Card.Footer>
    </Card>
  );
};

export default EditInfo;
