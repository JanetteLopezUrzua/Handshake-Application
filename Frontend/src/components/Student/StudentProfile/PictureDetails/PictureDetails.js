import React from "react";
import axios from "axios";
// import cookie from "react-cookies";
import Card from "react-bootstrap/Card";
// import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { FaCamera } from "react-icons/fa";
import ModalPicture from "./Modal";

class PictureDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      name: "",
      college: "",
      show: false,
      has_image: false,
      file: "",
      imagePreviewURL: "",
      photo: "",
    };
  }

  static getDerivedStateFromProps = (props) => ({ id: props.id })

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    axios
      .get(`http://localhost:3001/student/pictureinfo/${this.state.id}`)
      .then(response => {
        const info = response.data;

        this.setState({
          name: info.name,
          college: info.college,
          photo: info.photo,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  photoHandler = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    if (file && file.type.match('image.*')) {
      reader.readAsDataURL(file);
    }

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewURL: reader.result
      });
    };
  }

  onUpload = (e) => {
    e.preventDefault();
    const imgdata = this.state.imagePreviewURL.split(',')[1];
    const raw = window.atob(imgdata);
    const rawlength = raw.length;
    const arr = new Uint8Array(new ArrayBuffer(rawlength));

    for (let i = 0; i < rawlength; i++) {
      arr[i] = raw.charCodeAt(i);
    }

    const image = [];
    for (let i = 0; i < rawlength; i++) {
      image.push((arr[i]));
    }

    const data = {
      id: this.state.id,
      photo: image
    };

    axios
      .post("http://localhost:3001/student/pictureinfo", data)
      .then(response => {
        console.log(response);

        this.setState({
          photo: image,
          has_image: true,
          show: false,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleClose = () => {
    // eslint-disable-next-line implicit-arrow-linebreak
    this.setState({
      show: false
    });
  };

  handleShow = () =>
    // eslint-disable-next-line implicit-arrow-linebreak
    this.setState({
      show: true
    });

  onDelete = () => {};

  render() {
    let studentPhoto = "";
    const image = `data:image/jpeg;base64, ${this.state.photo}`;

    if (this.state.has_image === false) {
      studentPhoto = (
        <Button className="ProfilePicButton" onClick={this.handleShow}>
          <Row>
            <FaCamera size={25} style={{ margin: "0 auto" }} />
          </Row>
          <Row>
            <h5 style={{ margin: "0 auto", fontSize: "13px" }}>Add a Photo</h5>
          </Row>
        </Button>
      );
    } else {
      studentPhoto = (
        <Image className="ProfilePicButton" src={image} roundedCircle />
      );
    }

    return (
      <Card>
        <ModalPicture
          show={this.state.show}
          close={this.handleClose}
          onUpload={this.onUpload}
          photoHandler={this.photoHandler}
        />
        {studentPhoto}
        <Card.Title
          style={{ fontSize: "34px", fontWeight: "500", textAlign: "center" }}
        >
          {this.state.name}
        </Card.Title>
        <Card.Subtitle style={{ fontSize: "18px", textAlign: "center" }}>
          {this.state.college}
        </Card.Subtitle>
      </Card>
    );
  }
}

export default PictureDetails;
