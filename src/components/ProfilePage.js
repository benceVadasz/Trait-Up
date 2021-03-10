import React, {useContext} from 'react';
import {Button, Typography, Container, Paper, Grid } from '@material-ui/core';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {teal, orange} from '@material-ui/core/colors';
import 'fontsource-roboto';
import {UserContext} from '../context/UserContext';
import ProfileMenu from './ProfileMenu';
import ProfilePersonalInfo from './ProfilePersonalInfo'
import EditIcon from '@material-ui/icons/Edit';
// import ProfileMiniDrawer from './ProfileMiniDrawer';
// import TemporaryDrawer from './TemporaryProfileDrawer';
// import ProfileDropDownMenu from './ProfileDropDownMenu';


const classes = {
    container: {
        marginTop: "100px",
        padding: "20px",
        maxWidth: "80%",

    },
    paper: {
        padding: "30px", 
        margin: "20px", 
        alignItems: "center", 
        display: "flex", 
        flexFlow: "column"
    },
    paperEdu: {
        padding: "20px",
        margin: "15px",
        background: "#e7f7fe",
    },
    button: {
        width: "100%",
        fontSize: "18px",
    },
    avatar: {
        width: "150px",
        height: "150px",
        margin: "5px",
    },
    eduText: {
        marginBottom: "5px",
    }

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

    const [user, setUser] = useContext(UserContext);


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
                                    <Paper elevation={3} style={classes.paper}>
                                        <Grid container spacing={3} direction="column">
                                            <Grid item xs>
                                                <Typography variant="h2" color="primary" align="center">Education</Typography>  
                                            </Grid>
                                            <Grid item xs container justify="center">
                                                {user.education.map((edu, i) => (
                                                    <Grid item xs={10} key={i}>
                                                        <Paper elevation={2} style={classes.paperEdu}>
                                                            <Grid container alignItems="center">
                                                                <Grid item xs={10}>
                                                                    <Typography variant="h4" color="primary" style={classes.eduText}>{edu.school}</Typography>
                                                                    <Typography variant="body1" color="primary">{edu.degree}</Typography>
                                                                    <Typography variant="body2" color="primary">Graduated: {edu.to}</Typography>
                                                                </Grid>
                                                                <Grid item xs={2}>
                                                                    <Button variant="contained" color="primary" size="large" style={classes.button} endIcon={<EditIcon fontSize="large" />}>Edit</Button>
                                                                </Grid>
                                                            </Grid>
                                                        </Paper>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>  

                                {/* Experience */}
                                <Grid item xs={12}>
                                    <Paper elevation={3} style={classes.paper}>
                                        <Grid container spacing={3} direction="column">
                                            <Grid item xs>
                                                <Typography variant="h2" color="primary" align="center">Experience</Typography>  
                                            </Grid>
                                            <Grid item xs container justify="center">
                                                {user.experience.map((exp, i) => (
                                                    <Grid item xs={10} key={i}>
                                                        <Paper elevation={2} style={classes.paperEdu}>
                                                            <Grid container alignItems="center">
                                                                <Grid item xs={10}>
                                                                    <Typography variant="h4" color="primary" style={classes.eduText}>{exp.jobTitle}</Typography>
                                                                    <Typography variant="body1" color="primary">{exp.employer}</Typography>
                                                                    <Typography variant="body2" color="primary">From {exp.from} to {exp.to}</Typography>
                                                                </Grid>
                                                                <Grid item xs={2}>
                                                                    <Button variant="contained" color="primary" size="large" style={classes.button} endIcon={<EditIcon fontSize="large" />}>Edit</Button>
                                                                </Grid>
                                                            </Grid>
                                                        </Paper>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Grid>
                                    </Paper>
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
