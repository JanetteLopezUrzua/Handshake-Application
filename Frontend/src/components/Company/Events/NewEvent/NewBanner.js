import React from "react";
// import cookie from "react-cookies";
import Card from "react-bootstrap/Card";
// import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { FaCamera } from "react-icons/fa";
import NewBannerModal from "./NewBannerModal";

class NewBanner extends React.Component {
  constructor() {
    super();

    this.state = {
      show: false,
      has_image: false,
      image: "",
      photo: "",
      validimage: "",
      errormessage: "",
    };
  }

  photoHandler = e => {
    e.preventDefault();
    const file = e.target.files[0];

    // console.log(file);
    this.getImage(file);
  };

  getImage = file => {
    const reader = new FileReader();

    if (file && file.type.match("image.*")) {
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        this.setState({
          image: reader.result,
          validimage: true,
          errormessage: ""
        });
      };
    } else {
      this.setState({
        validimage: false,
        errormessage: "File not accepted. Choose an Image."
      });
    }
  };

  onUpload = e => {
    // console.log(this.state.validimage);
    e.preventDefault();
    if (this.state.validimage === true) {
      const { image } = this.state;

      this.setState({
        photo: image,
        has_image: true,
        show: false,
      });

      this.props.handlephotochange(image);
    }
  };

  onDelete = e => {
    e.preventDefault();

    this.setState({
      show: false,
      has_image: false,
      photo: "",
    });

    this.props.handlephotochange("");
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

  render() {
    let banner = "";

    if (this.state.has_image === false) {
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
    } else if (this.state.has_image === true) {
      banner = (
        <>
          <Image
            className="BannerPicImage"
            src={this.state.photo}
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
    }

    return (
      <Card style={{ height: "200px", padding: "0" }}>
        <NewBannerModal
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

export default NewBanner;
