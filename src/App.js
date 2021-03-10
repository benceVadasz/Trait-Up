import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeBody from "./components/HomeBody";
import React from "react";
import Register from "./components/Register";

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route exact path="/" children={<HomeBody />} />
        <Route exact path="/register" children={<Register />} />
      </Router>
    </div>
  );
}
export default App;
