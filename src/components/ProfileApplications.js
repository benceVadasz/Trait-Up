import React, {useContext} from 'react';
import {Button, Typography, Paper, Grid } from '@material-ui/core';
import 'fontsource-roboto';

const classes = {
    paper: {
        padding: "20px", 
        margin: "20px", 
        alignItems: "center", 
        background: "#eceef7",
    },
}


const ProfileApplications = () => {

    return (
        <>
            <Paper elevation={3} style={classes.paper}>
                <Grid container spacing={3} direction="column">
                    <Grid item xs>
                        <Typography variant="h2" color="primary" align="center">Applications</Typography>  
                    </Grid>
                    <Grid item xs container justify="center">
                        
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default ProfileApplications
