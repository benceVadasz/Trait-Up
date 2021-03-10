import React, {useState} from 'react';
import {Button, TextField, Typography, Container, Paper, Grid, Avatar, Divider} from '@material-ui/core';
import {makeStyles, ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {teal, orange} from '@material-ui/core/colors';
import 'fontsource-roboto';
import batman from '../images/batman.jpg';

// const useStyles = makeStyles({
//     root: {
        
//     }
// })

const theme = createMuiTheme({
    typography: {
        h1: {
            fontSize: 36,
        },
        h2: {
            fontSize: 30,
        },
        h3: {
            fontSize: 24,
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
                startDate: "1880-09-01",
                finishDate: "1882-06-01"
            },
            {
                type: "university",
                school: "Cambridge University",
                degree: "Psychology",
                level: "PhD",
                startDate: "1882-09-01",
                finishDate: "1884-06-01"
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
                <Container maxWidth="lg">
                    
                    <Typography variant="h1" color="primary" align="center">Profile page</Typography>
                    <Paper elevation={3} style={{ padding: "30px", 
                                                margin: "20px", 
                                                alignItems: "center", 
                                                display: "flex", 
                                                flexFlow: "column" }}>

                        
                        
                        <Grid container spacing={3} direction="column">
                            <Grid item xs={12} justify="center">
                                <Typography variant="h2" color="primary" align="center">Personal information</Typography>  
                            </Grid>
                            <Grid item xs={12} container spacing={3} direction="row">
                                <Grid item xs={4}>
                                    <Avatar src={user.photo} alt="pic" variant="square" style={{width: "350px", height: "400px"}}/>
                                </Grid>
                                
                                <Grid item xs={8} container direction="row" spacing={2} align="center">
                                    <Grid item xs={6} container align="right">
                                        <Grid item xs={12}>
                                            <Typography variant="h3" color="primary" align="right">Name:</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h3" color="primary" align="right">Email:</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h3" color="primary" align="right">Phone:</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h3" color="primary" align="right">Address:</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h3" color="primary" align="right">Location:</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={1} align="center">
                                        <Divider orientation="vertical" />
                                    </Grid>
                                    <Grid item xs={5} container direction="column" align="left">
                                        <Grid item xs>
                                            <TextField disabled variant="standard" value={user.name} />
                                        </Grid>
                                        <Grid item xs>
                                            <TextField disabled variant="standard" value={user.email} />
                                        </Grid>
                                        <Grid item xs>
                                            <TextField disabled variant="standard" value={user.phone} />
                                        </Grid>
                                        <Grid item xs>
                                            <TextField disabled variant="standard" value={user.address} />
                                        </Grid>
                                        <Grid item xs>
                                            <TextField disabled variant="standard" value={user.location} />
                                        </Grid>
                                    </Grid>
                                    
                                </Grid>

                            </Grid>
                        </Grid>
                
                    </Paper>

                    <Grid container xs={12} justify="center">
                        <Paper elevation={2} style={{ padding: "20px", alignItems: "center"}}>
                            <TextField 
                                variant="filled"
                                label="input field"
                                size="medium"
                                // value="value"
                                placeholder="placeholder" 
                                />
                            <Button variant="contained" color="primary">Details</Button>
                        </Paper>
                    </Grid>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default ProfilePage;
