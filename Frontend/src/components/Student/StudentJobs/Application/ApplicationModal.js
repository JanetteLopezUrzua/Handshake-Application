import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const ApplicationModal = props => (
  <Modal show={props.show} onHide={props.close}>
    <Modal.Header closeButton>
      <Modal.Title>Upload Resume</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form.Control onChange={props.resumeHandler} type="file" />
      <p className="errormessage">{props.errormessage}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button className="save" onClick={props.onUpload}>
          Submit
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ApplicationModal;
