import React, {useState} from 'react';
import {Button, TextField, Typography, Container, Paper, Grid, Avatar, Divider} from '@material-ui/core';
import {makeStyles, ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {teal, orange} from '@material-ui/core/colors';
import 'fontsource-roboto';
import batman from '../images/batman.jpg';
import PersonIcon from '@material-ui/icons/Person';
import StarIcon from '@material-ui/icons/Star';
import DescriptionIcon from '@material-ui/icons/Description';
import AssessmentIcon from '@material-ui/icons/Assessment';
import EditIcon from '@material-ui/icons/Edit';
// import ProfileMiniDrawer from './ProfileMiniDrawer';
// import TemporaryDrawer from './TemporaryProfileDrawer';
// import ProfileDropDownMenu from './ProfileDropDownMenu';

// const useStyles = makeStyles({
//     root: {
        
//     }
// })

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

    const [user, setUser] = useState({
        name: "Sherlock Holmes",
        email: "sherlock@holmes.com",
        password: "1234",
        address: "221B Baker Street, London",
        location: "London",
        phone: "+36/20-111-2233",
        photo: batman,
        languages: ["english", "german", "esperanto"],
        education: [
            {
                type: "university",
                school: "Oxford University",
                degree: "Forensic science",
                level: "Msc",
                from: "1880-09-01",
                to: "1882-06-01"
            },
            {
                type: "university",
                school: "Cambridge University",
                degree: "Psychology",
                level: "PhD",
                from: "1882-09-01",
                to: "1884-06-01"
            }
        ],
        experience: [
            {
                jobTitle: "detective",
                employer: "Scotland Yard",
                from: "1884-06-01",
                to: "1890-06-01"
            },
            {
                jobTitle: "consultant",
                employer: "Interpol",
                from: "1884-06-01",
                to: "1890-06-01"
            }
        ]
    })


    return (
        <>
            <ThemeProvider theme={theme}>
                <Container style={classes.container}>
                    
                    {/* <Typography variant="h1" color="primary" align="center">Profile page</Typography> */}

                    <Grid container spacing={4} direction="row">

                        {/* Profile menu */}
                        <Grid item xs={3}>
                            <Paper elevation={3} style={classes.paper}>
                                <Grid container spacing={2} direction="column">
                                    <Grid item xs align="center">
                                        <Avatar src={user.photo} alt="pic" variant="circular" style={classes.avatar} />
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="h3" color="primary" align="center">Profile Menu</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Divider orientation="horizontal" style={{ margin: "5px 0 10px 0" }} />
                                    </Grid>
                                    <Grid item xs>
                                        <Button variant="contained" color="primary" size="large" style={classes.button} startIcon={<PersonIcon fontSize="large" />}>Profile Info</Button>
                                    </Grid>
                                    <Grid item xs>
                                        <Button variant="contained" color="primary" size="large" style={classes.button} startIcon={<StarIcon fontSize="large" />}>Favorites</Button>
                                    </Grid>
                                    <Grid item xs>
                                        <Button variant="contained" color="primary" size="large" style={classes.button} startIcon={<DescriptionIcon fontSize="large" />}>Applications</Button>
                                    </Grid>
                                    <Grid item xs>
                                        <Button variant="contained" color="primary" size="large" style={classes.button} startIcon={<AssessmentIcon fontSize="large" />}>Assessments</Button>
                                    </Grid>
                                </Grid> 
                            </Paper>
                        </Grid>
                        

                        <Grid item xs={9}>

                            <Grid container direction="column">

                                {/* Personal information */}
                                <Grid item xs={12}>                        
                                    <Paper elevation={3} style={classes.paper}>
                                        <Grid container spacing={3} direction="column">
                                            <Grid item>
                                                <Typography variant="h2" color="primary" align="center">Personal information</Typography>  
                                            </Grid>
                                            <Grid item container spacing={3} direction="row">
                                                <Grid item xs={4}>
                                                    <Avatar src={user.photo} alt="pic" variant="square" style={{margin: "10px", width: "350px", height: "400px"}}/>
                                                </Grid>
                                                
                                                <Grid item xs={8} container direction="row" spacing={2} align="center" style={{padding: "30px"}}>
                                                    <Grid item xs={6} container spacing={2}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h4" color="primary" align="right">Name:</Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h4" color="primary" align="right">Email:</Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h4" color="primary" align="right">Phone:</Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h4" color="primary" align="right">Address:</Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h4" color="primary" align="right">Password:</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={1} align="center">
                                                        <Divider orientation="vertical" />
                                                    </Grid>
                                                    <Grid item xs={5} container spacing={2}>
                                                        <Grid item xs={12}>
                                                            <TextField disabled variant="standard" value={user.name} align="left" />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextField disabled variant="standard" value={user.email} align="left"/>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextField disabled variant="standard" value={user.phone} align="left"/>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextField disabled variant="standard" value={user.address} align="left"/>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextField disabled variant="standard" value={user.password} type="password" align="left"/>
                                                        </Grid>
                                                    </Grid>
                                                    
                                                </Grid>

                                            </Grid>
                                        </Grid> 
                                    </Paper>
                                </Grid>

                                {/* Education history */}
                                <Grid item xs={12}>
                                    <Paper elevation={3} style={classes.paper}>
                                        <Grid container spacing={3} direction="column">
                                            <Grid item xs>
                                                <Typography variant="h2" color="primary" align="center">Education</Typography>  
                                            </Grid>
                                            <Grid item xs container justify="center">
                                                {user.education.map((edu) => (
                                                    <Grid item xs={10}>
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
                            </Grid>
                        </Grid>
                    
                        
                    </Grid>

                </Container>
            </ThemeProvider>
        </>
    )
}

export default ProfilePage;
