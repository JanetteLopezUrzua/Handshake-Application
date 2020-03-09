/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Firstscreen from "./components/Firstscreen";
import StudentSignup from "./components/Student/Signup";
import StudentSignin from "./components/Student/Signin";
import StudentProfile from "./components/Student/StudentProfile/ProfilePage";
import CompanySignup from "./components/Company/Signup";
import CompanySignin from "./components/Company/Signin";
import CompanyProfile from "./components/Company/CompanyProfile/ProfilePage";
import StudentStudentsList from "./components/Student/StudentTab/StudentsPage";
import CompanyStudentsList from "./components/Company/StudentTab/StudentsPage";
import NewEvent from "./components/Company/Events/NewEvent/NewEventInfo";
import CompanyEvents from "./components/Company/Events/EventPage";
import Event from "./components/Company/Events/EventContainer/EventContainer";

import Navbar from "./components/Navigationbar";


// App Component
class App extends Component {
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
    const DefaultContainer = () => (
      <div>
        <Navbar photochange={this.state.photochange} />
        <Switch>
          <Route path="/event/:event_id" component={Event} />
          <Route path="/company/events/new" component={NewEvent} />
          <Route path="/company/events" component={CompanyEvents} />
          <Route path="/student/students" component={StudentStudentsList} />
          <Route path="/company/students" component={CompanyStudentsList} />
          <Route path="/student/:id" render={(props) => <StudentProfile {...props} handlephotochange={this.handlephotochange} />} />
          <Route path="/company/:id" render={(props) => <CompanyProfile {...props} handlephotochange={this.handlephotochange} />} />
        </Switch>
      </div>
    );
    return (
      // Use Browser Router to route to different pages
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Firstscreen} />
          <Route path="/student/signup" component={StudentSignup} />
          <Route path="/student/signin" component={StudentSignin} />
          <Route path="/company/signup" component={CompanySignup} />
          <Route path="/company/signin" component={CompanySignin} />
          <Route component={DefaultContainer} />
        </Switch>
      </BrowserRouter>
    );
  }
}
// Export the App component so that it can be used in index.js
export default App;
