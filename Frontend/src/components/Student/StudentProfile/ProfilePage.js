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
import PictureDetails from './PictureDetails/PictureDetails';
import ContactInformation from './ContactInfo/ContactInformation';
import EducationDetails from './EducationDetails/EducationDetails';
import WorkDetails from './WorkDetails/WorkDetails';


class ProfilePage extends React.Component {
  constructor() {
    super();
    this.state = {
      photochange: false,
      collegechange: false,
    };
  }

  handlephotochange = () => {
    this.setState(prevState => ({ photochange: !prevState.photochange }));
  };

  handlecollegechange = () => {
    console.log('COLLEGE CHANGED!');
    this.setState(prevState => ({ collegechange: !prevState.collegechange }));
  }

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
              <PictureDetails id={this.props.match.params.id} photochange={this.handlephotochange} collegechange={this.state.collegechange} />
              <Skillset id={this.props.match.params.id} />
              <BasicDetails id={this.props.match.params.id} collegechange={this.handlecollegechange} />
            </Col>
            <Col sm={8}>
              <CareerObjective id={this.props.match.params.id} />
              <EducationDetails id={this.props.match.params.id} />
              <WorkDetails id={this.props.match.params.id} />
              <ContactInformation id={this.props.match.params.id} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ProfilePage;
