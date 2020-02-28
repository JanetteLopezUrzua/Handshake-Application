import React from 'react';
import "../../components.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Redirect } from "react-router";
import cookie from "react-cookies";
import Navbar from "../../Navigationbar";
import BasicDetails from "./BasicDetails/BasicDetails";
import CareerObjective from './CareerObjective/CareerObjective';
import Skillset from './Skillset/Skillset';


class ProfilePage extends React.Component {
  render() {
    // if not logged in go to login page
    let redirectVar = null;
    if (!cookie.load('id')) {
      redirectVar = <Redirect to="/" />;
    }
    return (
      <div>
        {redirectVar}
        <Navbar />
        <Container>
          <Row>
            <Col sm={4}>sm</Col>
            <Col sm={8}><CareerObjective /></Col>
          </Row>
          <Row>
            <Col sm={4}><Skillset /></Col>
          </Row>
          <Row>
            <Col sm={4}><BasicDetails /></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ProfilePage;
