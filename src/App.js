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
      </Router>
    </div>
  );
}
export default App;
