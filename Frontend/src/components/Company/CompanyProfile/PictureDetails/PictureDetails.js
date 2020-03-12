import React from "react";
import axios from "axios";
import cookie from "react-cookies";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaCamera } from "react-icons/fa";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import { MdEdit } from 'react-icons/md';
import ModalPicture from "./Modal";

class PictureDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      name: "",
      show: false,
      has_image: false,
      data: "",
      photo: "",
      validimage: "",
      errormessage: "",
      nameerrormessage: "",
      editWasTriggered: false
    };
  }

  static getDerivedStateFromProps = props => ({ id: props.id });

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    axios
      .get(`http://localhost:3001/company/pictureinfo/${this.state.id}`)
      .then(response => {
        const info = response.data;

        console.log(response.data);
        this.setState({
          name: info.name,
          photo: info.photo
        });

        if (this.state.photo === "" || this.state.photo === null) {
          this.setState({
            has_image: false
          });
        } else {
          this.setState({
            has_image: true
          });
        }
      })
      .catch(error => {
        console.log(error);
        console.log(error.response.data);
      });
  };

  photoHandler = e => {
    e.preventDefault();
    const file = e.target.files[0];

    console.log(file);
    this.getImage(file);
  };

  getImage = file => {
    const data = new FormData();

    if (file && file.type.match("image.*")) {
      data.append('file', file);
      data.append('name', 'file');
      console.log(data);
      this.setState({
        data,
        validimage: true,
        errormessage: "",
      });
    } else {
      this.setState({
        validimage: false,
        errormessage: "File not accepted. Choose an Image."
      });
    }
  };

  onUpload = e => {
    console.log(this.state.validimage);
    e.preventDefault();
    if (this.state.validimage === true) {
      console.log(this.state.data);
      axios
        .post('http://localhost:3001/upload', this.state.data)
        .then(response => {
          console.log("res", response.data);
          console.log(response.data);
          const data = {
            id: this.state.id,
            photo: response.data
          };

          return axios.post("http://localhost:3001/company/pictureinfo", data);
        })
        .then(response => {
          console.log(response);

          this.setState({
            has_image: true,
            show: false,
          });
          this.props.photochange();
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  handleClose = () => {
    // eslint-disable-next-line implicit-arrow-linebreak
    this.setState({
      show: false,
      errormessage: ""
    });
  };

  handleShow = () =>
    // eslint-disable-next-line implicit-arrow-linebreak
    this.setState({
      show: true
    });

  onDelete = e => {
    e.preventDefault();

    axios
      .delete("http://localhost:3001/company/pictureinfo/delete", {
        data: { id: this.state.id }
      })
      .then(response => {
        console.log(response);
        this.setState({
          show: false,
          has_image: false,
        });
        this.props.photochange();
      })
      .catch(error => {
        console.log(error);
      });

    // this.getInfo();
  };

  handleClick = (e) => {
    e.preventDefault();
    console.log("button was pressed!!!!");
    this.setState({ editWasTriggered: true });

    // this.getInfo();
  };

  handleSave = (e) => {
    e.preventDefault();

    const wspatt = new RegExp("^ *$");

    if (wspatt.test(this.state.name) || this.state.name === "") {
      this.setState({
        nameerrormessage: "Enter Company Name"
      });
    } else {
      const data = {
        id: this.state.id,
        name: this.state.name,
      };

      axios.post("http://localhost:3001/company/personalinfoname", data)
        .then(response => {
          console.log(response);
          this.setState({
            nameerrormessage: ""
          });
        })
        .catch(error => {
          console.log(error);
        });

      this.setState({ editWasTriggered: false });
    }
  };

  handleCancel = () => {
    this.setState({ nameerrormessage: "", editWasTriggered: false });
    this.getInfo();
  };

  nameChangeHandler = e => {
    this.setState({
      name: e.target.value
    });
  };

  render() {
    let profilePhoto = "";

    if (this.state.has_image === false) {
      if (cookie.load('id') === this.state.id && cookie.load('user') === "company") {
        profilePhoto = (
          <Button className="CompanyProfilePicButton" onClick={this.handleShow}>
            <Row>
              <FaCamera size={25} style={{ margin: "0 auto" }} />
            </Row>
            <Row>
              <h5 style={{ margin: "0 auto", fontSize: "13px" }}>Add a Photo</h5>
            </Row>
          </Button>
        );
      } else {
        profilePhoto = (
          <p
            className="CompanyProfilePicNoImage"
          >
            {this.state.name.charAt(0)}
          </p>
        );
      }
    } else if (this.state.has_image === true) {
      if (cookie.load('id') === this.state.id && cookie.load('user') === "company") {
        profilePhoto = (
          <>
            <Image
              className="CompanyProfilePicImage"
              src={`http://localhost:3001/resumesandimages/${this.state.photo}`}
            />
            <Button className="CompanyProfilePicButtononImage" onClick={this.handleShow}>
              <Row>
                <FaCamera size={25} style={{ margin: "0 auto" }} />
              </Row>
              <Row>
                <h5 style={{ margin: "0 auto", fontSize: "13px" }}>
                    Change Photo
                </h5>
              </Row>
            </Button>
          </>
        );
      } else {
        profilePhoto = (
          <>
            <Image
              className="CompanyProfilePicImage"
              src={`http://localhost:3001/resumesandimages/${this.state.photo}`}
            />
          </>
        );
      }
    }
    let button = "";
    if (cookie.load('id') === this.state.id && cookie.load('user') === "company") {
      button = (
        <Col style={{ textAlign: "right" }}>
          <Button className="editbutton" onClick={this.handleClick}>
            <MdEdit style={{ color: "black" }} />
          </Button>
        </Col>
      );
    }


    let display = "";
    display = (
      <Row>
        <Col><Card.Title style={{ textTransform: "capitalize" }}>{this.state.name}</Card.Title></Col>
        {button}
      </Row>
    );

    if (this.state.editWasTriggered) {
      display = (
        <Card>
          <Form.Group controlId="Name">
            <Form.Label className="labels">Company Name</Form.Label>
            <Form.Control style={{ textTransform: "capitalize" }} onChange={this.nameChangeHandler} name="name" type="text" value={this.name} />
            <p className="errormessage" style={{ fontSize: "13px" }}>{this.state.nameerrormessage}</p>
          </Form.Group>
          <Card.Footer>
            <Button className="cancel" onClick={this.handleCancel}>Cancel</Button>
            <Button className="save" onClick={this.handleSave}>Save</Button>
          </Card.Footer>
        </Card>
      );
    }

    return (
      <Card style={{ padding: "0" }}>
        <ModalPicture
          show={this.state.show}
          close={this.handleClose}
          onUpload={this.onUpload}
          photoHandler={this.photoHandler}
          errormessage={this.state.errormessage}
          has_image={this.state.has_image}
          onDelete={this.onDelete}
        />
        {/* <Container style={{ height: "200px" }}>
          <Card.Img className="CompanyProfilePicImage" variant="top" src="" />
        </Container> */}
        <Row>
          <Col sm={2}>
            <Card style={{ height: "122px", width: "122px", padding: "0" }}>
              {profilePhoto}
            </Card>
          </Col>
          <Col sm={10}>
            <Card.Body style={{ paddingBottom: "0" }}>
              <NavDropdown.Divider style={{ color: "rgba(0, 0, 0, 0.98)" }} />
              <Card style={{
                border: "none", boxShadow: "none", color: "rgba(0, 0, 0, 0.98)", fontSize: "24px", fontWeight: "500"
              }}
              >
                {display}
              </Card>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default PictureDetails;
