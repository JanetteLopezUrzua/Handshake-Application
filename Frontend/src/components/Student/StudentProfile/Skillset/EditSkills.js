import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const EditSkills = (props) => (
  <Form>
    <Row style={{ marginTop: "20px" }}>
      <Col sm={8}><Form.Control onChange={props.skillschange} name="skill" type="text" placeholder="Add more skills" /></Col>
      <Col sm={4}><Button className="save" onClick={props.save}>Add</Button></Col>
    </Row>
  </Form>
);

export default EditSkills;
