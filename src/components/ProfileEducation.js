import React, {useContext} from 'react';
import { Typography, Paper, Grid } from '@material-ui/core';
import 'fontsource-roboto';
import {UserContext} from '../contexts/UserContext';
import ProfileEditDeleteButton from './ProfileEditDeleteButton';

const classes = {
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
        background: "#eceef7",
    },
    eduText: {
        marginBottom: "5px",
        fontWeight: "bold",
    }
}


const ProfileEducation = () => {

    const [user] = useContext(UserContext);

    return (
        <>
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
                                            <Typography variant="body1" color="primary" style={classes.eduText}>{edu.degree} {edu.level}</Typography>
                                            <Typography variant="body2" color="primary" style={classes.eduText}>Graduated: {edu.to}</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <ProfileEditDeleteButton/>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default ProfileEducation
