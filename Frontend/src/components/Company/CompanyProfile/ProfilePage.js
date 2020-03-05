import React from 'react';
import "../../components.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Redirect } from "react-router";
import cookie from "react-cookies";
import Navbar from "../Navigationbar";
import BasicDetails from "./BasicDetails/BasicDetails";
import PictureDetails from './PictureDetails/PictureDetails';
import ContactInformation from './ContactInfo/ContactInformation';

class ProfilePage extends React.Component {
  constructor() {
    super();
    this.state = {
      photochange: false,
    };
  }

  handlephotochange = () => {
    this.setState(prevState => ({ photochange: !prevState.photochange }));
  };

  render() {
    // if not logged in go to login page
    let redirectVar = null;
    if (!cookie.load('id')) {
      redirectVar = <Redirect to="/" />;
    }
    return (
      <div>
        {redirectVar}
        <Navbar id={cookie.load('id')} photochange={this.state.photochange} />
        <Container>
          <Row>
            <Col sm={4}>
              <PictureDetails id={this.props.match.params.id} photochange={this.handlephotochange} />
              <ContactInformation id={this.props.match.params.id} />
            </Col>
            <Col sm={8}>
              <BasicDetails id={this.props.match.params.id} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ProfilePage;
