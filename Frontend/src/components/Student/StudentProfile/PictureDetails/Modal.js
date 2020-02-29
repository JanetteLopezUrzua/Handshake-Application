import React from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ImageUploader from "react-images-upload";


const ModalPicture = (props) => (
  <Modal show={props.show} onHide={props.close}>
    <Modal.Header closeButton>
      <Modal.Title>Modal heading</Modal.Title>
    </Modal.Header>
    <Modal.Body> <ImageUploader
      withIcon
      buttonText="Choose Image"
      onChange={props.onUpload}
      imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
      maxFileSize={5242880}
      fileContainerStyle={{
        color: "black"
      }}
      fileSizeError=" file size is too big"
      fileTypeError=" is not a supported file extension"
      singleImage
    />
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.close}>
              Close
      </Button>
      <Button variant="primary" onClick={props.close}>
              Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ModalPicture;
