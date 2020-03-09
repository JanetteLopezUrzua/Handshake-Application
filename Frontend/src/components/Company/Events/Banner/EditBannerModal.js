import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const ModalPicture = props => {
  // eslint-disable-next-line operator-linebreak
  const del =
    props.has_image === true ? (
      <Button className="delete" onClick={props.onDelete}>
        Delete
      </Button>
    ) : (
      ""
    );

  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control onChange={props.photoHandler} type="file" />
        <p>{props.errormessage}</p>
      </Modal.Body>
      <Modal.Footer>
        {del}
        <Button className="save" onClick={props.onUpload}>
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPicture;
