import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const EditSkills = (props) => (
  <Form style={{ width: '18rem' }}>
    <Form.Control onChange={props.skillschange} name="skill" type="text" placeholder="Add more skills" />
    <Button onClick={props.save}>Save</Button>
  </Form>
);

export default EditSkills;
