import React from "react";
import axios from "axios";
import cookie from "react-cookies";
import Card from "react-bootstrap/Card";
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
      show: false
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
          college: info.college
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  onUpload = picture => {
    const data = {
      picture: this.state.picture
    };

    axios
      .post("http://localhost:3001/student/pictureinfo", data)
      .then(response => {
        console.log(response);
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
    return (
      <Card>
        <ModalPicture
          show={this.state.show}
          close={this.handleClose}
          upload={this.onUpload}
        />
        <Button className="ProfilePicButton" onClick={this.handleShow}>
          <Row>
            <FaCamera size={25} style={{ margin: "0 auto" }} />
          </Row>
          <Row>
            <h5 style={{ margin: "0 auto", fontSize: "13px" }}>Add a Photo</h5>
          </Row>
        </Button>
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
