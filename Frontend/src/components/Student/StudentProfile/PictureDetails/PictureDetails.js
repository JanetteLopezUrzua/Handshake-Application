import React from "react";
import axios from "axios";
import cookie from "react-cookies";
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
      fname: "",
      lname: "",
      college: "",
      show: false,
      has_image: false,
      photo: "",
      validimage: "",
      errormessage: "",
    };
  }

  static getDerivedStateFromProps = props => ({ id: props.id });

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    axios
      .get(`http://localhost:3001/student/pictureinfo/${this.state.id}`)
      .then(response => {
        const info = response.data;

        console.log(response.data);
        this.setState({
          fname: info.fname,
          lname: info.lname,
          college: info.college,
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

        console.log(response.data);
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
      this.setState({
        data,
        validimage: true,
        errormessage: ""
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
      axios
        .post('http://localhost:3001/upload', this.state.data)
        .then(response => {
          console.log("res", response.data);

          const data = {
            id: this.state.id,
            photo: response.data
          };

          return axios.post("http://localhost:3001/student/pictureinfo", data);
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
      .delete("http://localhost:3001/student/pictureinfo/delete", {
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

  render() {
    let studentPhoto = "";

    if (this.state.has_image === false) {
      if (cookie.load('id') === this.state.id && cookie.load('user') === "student") {
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
          <div>
            <p
              className="ProfilePicNoImage"
            >
              {this.state.fname.charAt(0)}
              {this.state.lname.charAt(0)}
            </p>
          </div>
        );
      }
    } else if (this.state.has_image === true) {
      if (cookie.load('id') === this.state.id && cookie.load('user') === "student") {
        studentPhoto = (
          <>
            <Image
              className="ProfilePicImage"
              src={`http://localhost:3001/resumesandimages/${this.state.photo}`}
              roundedcircle="true"
            />
            <Button className="ProfilePicButtononImage" onClick={this.handleShow}>
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
        studentPhoto = (
          <>
            <Image
              className="ProfilePicImage"
              src={`http://localhost:3001/resumesandimages/${this.state.photo}`}
              roundedcircle="true"
            />
          </>
        );
      }
    }

    return (
      <Card>
        <ModalPicture
          show={this.state.show}
          close={this.handleClose}
          onUpload={this.onUpload}
          photoHandler={this.photoHandler}
          errormessage={this.state.errormessage}
          has_image={this.state.has_image}
          onDelete={this.onDelete}
        />
        {studentPhoto}
        <Card.Title
          style={{
            fontSize: "34px", fontWeight: "500", textAlign: "center", textTransform: "capitalize"
          }}
        >
          {this.state.fname}<br />
          {this.state.lname}
        </Card.Title>
        <Card.Subtitle style={{ fontSize: "18px", textAlign: "center", textTransform: "capitalize" }}>
          {this.state.college}
        </Card.Subtitle>
      </Card>
    );
  }
}

export default PictureDetails;
