import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import StudentSignup from "./components/Student/Signup/Signup";
// import StudentSignin from "./components/Student/Signin/Signin";
// import Navbar from "./components/Navbar/Navigationbar";
import Firstscreen from "./components/Firstscreen/Firstscreen";
import CompanySignup from "./components/Company/Signup/Signup";
import BasicDetails from "./components/Student/StudentProfile/BasicDetails/BasicDetails";

// App Component
class App extends Component {
  render() {
    return (
      // Use Browser Router to route to different pages
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Firstscreen} />
          <Route path="/student/signup" component={StudentSignup} />
          <Route path="/company/signup" component={CompanySignup} />
          <Route path="/student/1" component={BasicDetails} />
        </Switch>
      </BrowserRouter>
    );
  }
}
// Export the App component so that it can be used in index.js
export default App;
