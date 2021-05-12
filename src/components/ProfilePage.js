import React from 'react';
import {Container, Grid, useMediaQuery} from '@material-ui/core';
import {ThemeProvider, createMuiTheme, useTheme} from '@material-ui/core/styles';
import {orange} from '@material-ui/core/colors';
import 'fontsource-roboto';
import ProfileMenu from './ProfileMenu';
import ProfilePersonalInfo from './ProfilePersonalInfo';
import ProfileEducation from './ProfileEducation';
import ProfileExperience from './ProfileExperience';
import { Route} from 'react-router-dom';
import ProfileFavorites from './ProfileFavorites';
import ProfileApplications from './ProfileApplications';
import ProfileAssessments from './ProfileAssessments';




const classes = {
  container: {
    padding: '20px 0',
    // maxWidth: "90%",
  },
  title: {
    color: '#7c88cc',
  },
};

const theme = createMuiTheme({
  typography: {
    h1: {
      fontSize: 36,
      margin: '10px',
      color: '#7c88cc',
    },
    h2: {
      fontSize: 30,
      margin: '10px',
      color: '#7c88cc',
    },
    h3: {
      fontSize: 24,
      margin: '5px',
      color: '#7c88cc',
    },
    h4: {
      fontSize: 20,
      color: '#7c88cc',
    },
  },
  palette: {
    primary: {
      main: '#859DF4',
    },
    secondary: {
      main: orange[400],
    },
  },
});

const ProfilePage = () => {
  const theme2 = useTheme();
  const isMobile = useMediaQuery(theme2.breakpoints.down('sm'));

  return (
    <>
      {!isMobile ? <ThemeProvider theme={theme}>
        <Container maxWidth="lg" style={classes.container}>
          <Grid container spacing={3} direction="row">
            {/* Profile menu */}
            <Grid item xs={3}>
              <ProfileMenu/>
            </Grid>

            <Grid item xs={9}>
              <Route
                exact
                path="/profile"
                render={(props) => (
                  <>
                    <Grid container direction="column">
                      {/* Personal information */}
                      <Grid item xs={12}>
                        <ProfilePersonalInfo/>
                      </Grid>

                      {/* Education history */}
                      <Grid item xs={12}>
                        <ProfileEducation/>
                      </Grid>

                      {/* Experience */}
                      <Grid item xs={12}>
                        <ProfileExperience/>
                      </Grid>
                    </Grid>
                  </>
                )}
              />
              <Route
                exact
                path="/profile/favorites"
                render={(props) => (
                  <>
                    <ProfileFavorites {...props}/>
                  </>
                )}
              />
              <Route
                exact
                path="/profile/applications"
                render={(props) => (
                  <>
                    <ProfileApplications {...props}/>
                  </>
                )}
              />
              <Route
                exact
                path="/profile/assessments"
                render={(props) => (
                  <>
                    <ProfileAssessments/>
                  </>
                )}
              />
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider> : <ProfilePersonalInfo/>}
    </>
  );
};

export default ProfilePage;
