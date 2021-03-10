import React from 'react';
import {Container, Grid } from '@material-ui/core';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {teal, orange} from '@material-ui/core/colors';
import 'fontsource-roboto';
import ProfileMenu from './ProfileMenu';
import ProfilePersonalInfo from './ProfilePersonalInfo';
import ProfileEducation from './ProfileEducation';
import ProfileExperience from './ProfileExperience';
// import ProfileMiniDrawer from './ProfileMiniDrawer';
// import TemporaryDrawer from './TemporaryProfileDrawer';
// import ProfileDropDownMenu from './ProfileDropDownMenu';


const classes = {
    container: {
        marginTop: "100px",
        padding: "20px",
        maxWidth: "80%",
    },
}

const theme = createMuiTheme({
    typography: {
        h1: {
            fontSize: 36,
            margin: "10px",
        },
        h2: {
            fontSize: 30,
            margin: "10px",
        },
        h3: {
            fontSize: 24,
            margin: "5px",
        },
        h4: {
            fontSize: 20,
        }
    },
    palette: {
        primary: {
            main: teal[500],
        },
        secondary: {
            main: orange[500],
        }
    }
})

const ProfilePage = () => {

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container style={classes.container}>
                    
                    {/* <Typography variant="h1" color="primary" align="center">Profile page</Typography> */}

                    <Grid container spacing={3} direction="row">

                        {/* Profile menu */}
                        <Grid item xs={3}>
                            <ProfileMenu />
                        </Grid>

                        <Grid item xs={9}>
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
                        </Grid>    
                        
                    </Grid>

                </Container>
            </ThemeProvider>
        </>
    )
}

export default ProfilePage;
