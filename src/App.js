import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeBody from "./components/HomeBody";
import React from "react";

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <HomeBody />
        {/* <Route exact path="/jobs" children={<Jobs />} />
        <Route exact path="/types" children={<Types />} /> */}
      </Router>
    </div>
  );
}
export default App;
