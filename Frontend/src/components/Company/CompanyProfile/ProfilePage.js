import React from 'react';
import "../../components.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Redirect } from "react-router";
import cookie from "react-cookies";
import BasicDetails from "./BasicDetails/BasicDetails";
import PictureDetails from './PictureDetails/PictureDetails';
import ContactInformation from './ContactInfo/ContactInformation';

class ProfilePage extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    // if not logged in go to login page
    let redirectVar = null;
    if (!cookie.load('id')) {
      redirectVar = <Redirect to="/" />;
    }
    return (
      <Container>
        {redirectVar}
        <PictureDetails id={this.props.match.params.id} photochange={this.props.handlephotochange} />
        <Row>
          <Col sm={8}>
            <BasicDetails id={this.props.match.params.id} />
          </Col>
          <Col sm={4}>
            <ContactInformation id={this.props.match.params.id} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ProfilePage;
