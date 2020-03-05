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


// App Component
class App extends Component {
  render() {
    return (
      // Use Browser Router to route to different pages
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Firstscreen} />
          <Route path="/student/signup" component={StudentSignup} />
          <Route path="/student/signin" component={StudentSignin} />
          <Route path="/student/:id" component={StudentProfile} />
          <Route path="/company/signup" component={CompanySignup} />
          <Route path="/company/signin" component={CompanySignin} />
          <Route path="/company/:id" component={CompanyProfile} />
        </Switch>
      </BrowserRouter>
    );
  }
}
// Export the App component so that it can be used in index.js
export default App;
