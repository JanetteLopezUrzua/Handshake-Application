import React, { Component } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
// import Signup from "./components/Signup/Signup";
// import Signin from "./components/Signin/Signin";
import Navbar from "./components/Navbar/Navigationbar";

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
          <Navbar />
        </div>
      </BrowserRouter>
    );
  }
}
// Export the App component so that it can be used in index.js
export default App;
