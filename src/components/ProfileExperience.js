import React, {useContext} from 'react';
import {Button, Typography, Paper, Grid } from '@material-ui/core';
import 'fontsource-roboto';
import {UserContext} from '../context/UserContext';
import EditIcon from '@material-ui/icons/Edit';

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
        background: "#e7f7fe",
    },
    button: {
        width: "100%",
        fontSize: "18px",
    },
    eduText: {
        marginBottom: "5px",
    }
}

const ProfileExperience = () => {

    const [user, setUser] = useContext(UserContext);

    return (
        <>
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
        </>
    )
}

export default ProfileExperience
