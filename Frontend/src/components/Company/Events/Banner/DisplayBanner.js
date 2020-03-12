import React from "react";
import axios from "axios";
import cookie from "react-cookies";
import Card from "react-bootstrap/Card";
// import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { FaCamera } from "react-icons/fa";
import BannerModal from "./EditBannerModal";

class DisplayBanner extends React.Component {
  constructor() {
    super();

    this.state = {
      event_id: "",
      show: false,
      has_image: false,
      data: "",
      photo: "",
      validimage: "",
      errormessage: "",
      company_id: "",
    };
  }

  static getDerivedStateFromProps = (props) => ({ event_id: props.event_id })

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    axios
      .get(`http://localhost:3001/company/eventbannerphoto/${this.state.event_id}`)
      .then(response => {
        const info = response.data;

        console.log(response.data);
        this.setState({
          photo: info.photo,
          company_id: info.company_id.toString()
        });

        if (info.photo === "" || info.photo === null) {
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

    // console.log(file);
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
            event_id: this.state.event_id,
            photo: response.data
          };

          return axios.post("http://localhost:3001/company/eventbannerphoto", data);
        })
        .then(response => {
          console.log(response);

          this.setState({
            has_image: true,
            show: false,
          });
          this.getInfo();
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
      .delete("http://localhost:3001/company/eventbannerphoto/delete", {
        data: { event_id: this.state.event_id }
      })
      .then(response => {
        console.log(response);
        this.setState({
          show: false,
          has_image: false,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    let banner = "";
    // console.log("COOKIE ID", cookie.load('id'));
    // console.log("STATE ID", this.state.company_id);
    // console.log("COOKIE USER", cookie.load('user'));
    if (this.state.has_image === false) {
      if (cookie.load('id') === this.state.company_id && cookie.load('user') === "company") {
        banner = (
          <Button className="BannerPicButton" onClick={this.handleShow}>
            <Row>
              <FaCamera size={25} style={{ margin: "0 auto" }} />
            </Row>
            <Row>
              <h5 style={{ margin: "0 auto", fontSize: "13px" }}>Add a Photo</h5>
            </Row>
          </Button>
        );
      }
    } else if (this.state.has_image === true) {
      if (cookie.load('id') === this.state.company_id && cookie.load('user') === "company") {
        banner = (
          <>
            <Image
              className="BannerPicImage"
              src={`http://localhost:3001/resumesandimages/${this.state.photo}`}
              roundedcircle="true"
            />
            <Button className="BannerPicButtononImage" onClick={this.handleShow}>
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
        banner = (
          <>
            <Image
              className="BannerPicImage"
              src={`http://localhost:3001/resumesandimages/${this.state.photo}`}
              roundedcircle="true"
            />
          </>
        );
      }
    }

    return (
      <Card style={{ height: "200px", padding: "0" }}>
        <BannerModal
          show={this.state.show}
          close={this.handleClose}
          onUpload={this.onUpload}
          photoHandler={this.photoHandler}
          errormessage={this.state.errormessage}
          has_image={this.state.has_image}
          onDelete={this.onDelete}
        />
        {banner}
      </Card>
    );
  }
}

export default DisplayBanner;
