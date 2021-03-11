import React from 'react';
import {Container, Grid, Paper } from '@material-ui/core';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {teal, orange} from '@material-ui/core/colors';
import 'fontsource-roboto';
import ProfileMenu from './ProfileMenu';
import ProfilePersonalInfo from './ProfilePersonalInfo';
import ProfileEducation from './ProfileEducation';
import ProfileExperience from './ProfileExperience';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import ProfileMiniDrawer from './ProfileMiniDrawer';
// import TemporaryDrawer from './TemporaryProfileDrawer';
// import ProfileDropDownMenu from './ProfileDropDownMenu';


const classes = {
    container: {
        padding: "20px 0",
        // maxWidth: "90%",
    },
    title: {
        color: "#7c88cc",
    },
}

const theme = createMuiTheme({
    typography: {
        h1: {
            fontSize: 36,
            margin: "10px",
            color: "#7c88cc",
        },
        h2: {
            fontSize: 30,
            margin: "10px",
            color: "#7c88cc",
        },
        h3: {
            fontSize: 24,
            margin: "5px",
            color: "#7c88cc",
        },
        h4: {
            fontSize: 20,
            color: "#7c88cc",
        }
    },
    palette: {
        primary: {
            main: "#859DF4",
        },
        secondary: {
            main: orange[400],
        }
    }
})

const ProfilePage = () => {

    return (
        <>
            <Router>
                <ThemeProvider theme={theme}>
                    <Container maxWidth="lg" style={classes.container}>
                    
                        <Grid container spacing={3} direction="row">

                            {/* Profile menu */}
                            <Grid item xs={3}>
                                <ProfileMenu />
                            </Grid>

                            <Grid item xs={9}>
                                <Route exact path="/profile" render={(props) => (
                                    <>
                                        <Grid container direction="column">
                                            {/* Personal information */}
                                            <Grid item xs={12}>                        
                                                <ProfilePersonalInfo />
                                            </Grid>

                                            {/* Education history */}
                                            <Grid item xs={12}>
                                                <ProfileEducation />
                                            </Grid>  

                                            {/* Experience */}
                                            <Grid item xs={12}>
                                                <ProfileExperience />
                                            </Grid>
                                        </Grid>
                                    </>
                                )} />
                                <Route exact path="/profile/favorites" render={(props) => (
                                    <>
                                        <Paper>
                                            <h1 style={classes.title}>Favorites</h1>
                                        </Paper>
                                    </>
                                )} />
                                <Route exact path="/profile/applications" render={(props) => (
                                    <>
                                        <Paper>
                                            <h1 style={classes.title}>Applications</h1>
                                        </Paper>
                                    </>
                                )} /> 
                                <Route exact path="/profile/assessments" render={(props) => (
                                    <>
                                        <Paper>
                                            <h1 style={classes.title}>Assessments</h1>
                                        </Paper>
                                    </>
                                )} />    
                            </Grid>    
                            
                        </Grid>

                    </Container>
                </ThemeProvider>
            </Router>
        </>
    )
}

export default ProfilePage;
