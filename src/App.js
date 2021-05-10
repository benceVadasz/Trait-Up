import {Route, BrowserRouter as Router} from 'react-router-dom';
import JobList from "./components/JobList";
import JobDetail from "./components/JobDetail";
import {JobsProvider} from "./contexts/JobsContext";
import {JobProvider} from "./contexts/JobDetailContext";
import "./App.css";
import Navbar from "./components/Navbar";
import HomeBody from "./components/HomeBody";
import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import {StoreProvider, createStore} from "easy-peasy";
import ProfilePage from "./components/ProfilePage";
import {UserProvider} from "./contexts/UserContext";
import favouriteModel from "./favouriteModel";
import {useTheme} from '@material-ui/core/styles';
import {useMediaQuery} from '@material-ui/core';
import MobileNav from './components/MobileNav'

const App = (props) => {
  const store = createStore(favouriteModel);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {isMobile ? <MobileNav/> :
        <JobsProvider>
          <JobProvider>
            <Router>
              <StoreProvider store={store}>
                <Navbar/>
                <Route exact path="/" children={<HomeBody/>}/>
                <Route exact path="/register" children={<Register/>}/>
                <Route exact path="/login" children={<Login/>}/>
                <Route
                  exact
                  path="/jobs"
                  render={(props) => <JobList {...props} />}
                />
                <Route
                  exact
                  path="/jobs/:id"
                  children={<JobDetail/>}
                  // render={(props) => <JobDetail {...props} />}
                />

                <UserProvider>
                  <Route
                    path="/profile"
                    render={(props) => (
                      <>
                        <ProfilePage/>
                      </>
                    )}
                  />
                </UserProvider>
              </StoreProvider>
            </Router>
          </JobProvider>
        </JobsProvider>

      }
    </>
  );
};

export default App;
