import React, { Component } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import StudentSignup from "./components/Student/Signup/Signup";
import StudentSignin from "./components/Student/Signin/Signin";
import Navbar from "./components/Navbar/Navigationbar";
import Firstscreen from "./components/Firstscreen/Firstscreen";
import CompanySignup from "./components/Company/Signup/Signup";

// App Component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      // Use Browser Router to route to different pages
      <BrowserRouter>
        <div>
          <CompanySignup />
        </div>
      </BrowserRouter>
    );
  }
}
// Export the App component so that it can be used in index.js
export default App;
