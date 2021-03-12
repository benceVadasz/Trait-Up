import { Route, BrowserRouter as Router } from "react-router-dom";
import JobList from "./components/JobList";
import JobDetail from "./components/JobDetail";
import { JobsProvider } from "./context/JobsContext";
import { JobProvider } from "./context/JobDetailContext";
import "./App.css";
import Navbar from "./components/Navbar";
import HomeBody from "./components/HomeBody";
import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import { StoreProvider, createStore, persist } from "easy-peasy";
import userModel from "./userModel";
import ProfilePage from "./components/ProfilePage";
import { UserProvider } from "./context/UserContext";

const App = (props) => {
  const store = createStore(persist(userModel, { storage: "localStorage" }));
  return (
    <JobsProvider>
      <JobProvider>
        <Router>
          <StoreProvider store={store}>
            <Navbar />
            <Route exact path="/" children={<HomeBody />} />
            <Route exact path="/register" children={<Register />} />
            <Route exact path="/login" children={<Login />} />
            <Route
              exact
              path="/jobs"
              render={(props) => <JobList {...props} />}
            ></Route>
            <Route
              exact
              path="/jobs/:jobId"
              render={(props) => <JobDetail {...props} />}
            ></Route>

            <UserProvider>
              <Route
                exact
                path="/profile"
                render={(props) => (
                  <>
                    <ProfilePage />
                  </>
                )}
              />
            </UserProvider>
          </StoreProvider>
        </Router>
      </JobProvider>
    </JobsProvider>
  );
};

export default App;
