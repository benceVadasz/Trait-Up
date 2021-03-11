import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeBody from "./components/HomeBody";
import React from "react";
import Register from "./components/Register";
import { StoreProvider, createStore, persist } from "easy-peasy";
import userModel from "./userModel";

function App() {

  const store = createStore(persist(userModel, { storage: 'localStorage', }));

  return (
    <div className="App">
      <Router>
      <StoreProvider store={store}> 
        <Navbar />
        <Route exact path="/" children={<HomeBody />} />
        <Route exact path="/register" children={<Register />} />
        </StoreProvider>
      </Router>
    </div>
  );
}
export default App;
