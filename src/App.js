import {Route, BrowserRouter as Router} from 'react-router-dom';
import JobList from "./components/JobList";
import JobDetail from "./components/JobDetail";
import "./App.css";
import Navbar from "./components/Navbar";
import HomeBody from "./components/HomeBody";
import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import ProfilePage from "./components/ProfilePage";
import {UserProvider} from "./contexts/UserContext";
import {useTheme} from '@material-ui/core/styles';
import {useMediaQuery} from '@material-ui/core';
import MobileNav from './components/MobileNav'
import LandingPage from "./components/LandingPage";
import Feed from "./components/Feed";
import ProfileFavorites from "./components/ProfileFavorites";
import ProfileApplications from "./components/ProfileApplications";
import Tests from "./components/Tests";

const App = (props) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobileNavNeeded = window.location.href !== 'http://localhost:3000/login' &&
    window.location.href !== 'http://localhost:3000/register' &&
    window.location.href !== 'http://localhost:3000/';

  return (
    <>
      {isMobile ?
        <>
          <Router>
            {isMobileNavNeeded ? <MobileNav/> : null}
            <Route exact path="/feed" children={<Feed/>}/>
            <Route exact path="/" children={<LandingPage/>}/>
            <Route exact path="/register" children={<Register/>}/>
            <Route exact path="/login" children={<Login/>}/>
            <Route exact path="/jobs" children={<JobList/>}/>
            <Route
              exact
              path="/jobs/:id"
              children={<JobDetail/>}
            />
            <Route
              exact
              path="/profiles/favourites"
              render={(props) => (
                <>
                  <ProfileFavorites {...props}/>
                </>
              )}
            />
            <Route
              exact
              path="/profiles/applications"
              render={(props) => (
                <>
                  <ProfileApplications {...props}/>
                </>
              )}
            />

            <UserProvider>
              <Route
                path="/profile"
                render={(props) => (
                  <ProfilePage/>
                )}
              />
            </UserProvider>
          </Router>
        </> :
        <>
          <Router>
            <Navbar/>
            <Route exact path="/" children={<HomeBody/>}/>
            <Route exact path="/register" children={<Register/>}/>
            <Route exact path="/login" children={<Login/>}/>
            <Route exact path="/tests" children={<Tests/>}/>
            <Route
              exact
              path="/jobs"
              render={(props) => <JobList {...props} />}
            />
            <Route
              exact
              path="/jobs/:id"
              children={<JobDetail/>}
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
          </Router>
        </>
      }
    </>
  )
}

export default App;
