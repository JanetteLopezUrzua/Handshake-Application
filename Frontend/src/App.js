import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import StudentSignup from "./components/Student/Signup";
import StudentSignin from "./components/Student/Signin";
// import Navbar from "./components/Navbar/Navigationbar";
import Firstscreen from "./components/Firstscreen";
import CompanySignup from "./components/Company/Signup";
// import BasicDetails from "./components/Student/StudentProfile/BasicDetails/BasicDetails";
import ProfilePage from "./components/Student/StudentProfile/ProfilePage";

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
          <Route path="/company/signup" component={CompanySignup} />
          <Route path="/student/:id" component={ProfilePage} />
        </Switch>
      </BrowserRouter>
    );
  }
}
// Export the App component so that it can be used in index.js
export default App;
