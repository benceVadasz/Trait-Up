import React, {useState} from 'react';
import {Button, TextField, Typography, Container, Paper, Grid} from '@material-ui/core';
import {makeStyles, ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {teal, orange} from '@material-ui/core/colors';
import 'fontsource-roboto';

// const useStyles = makeStyles({
//     root: {
        
//     }
// })

const theme = createMuiTheme({
    typography: {
        h1: {
            fontSize: 36,
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
        photo: "../imgages/batman.jpg",
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
                    <Paper elevation={3} style={{ padding: "40px", 
                                                margin: "30px", 
                                                alignItems: "center", 
                                                display: "flex", 
                                                flexFlow: "column" }}>
                        <Grid container spacing={3} >
                            <Grid item xs={12} justify="center">
                                <Paper elevation={2} style={{ padding: "20px", alignItems: "center"}}>
                                    <Typography variant="h3" color="primary" align="center">Personal information</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} justify="center">
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


                        </Grid>

                        
                    </Paper>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default ProfilePage;
