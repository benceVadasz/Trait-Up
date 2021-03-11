import React, {useContext} from 'react';
import {Button, Typography, Paper, Grid } from '@material-ui/core';
import 'fontsource-roboto';

const classes = {
    paper: {
        padding: "30px", 
        margin: "20px", 
        alignItems: "center", 
        display: "flex", 
        flexFlow: "column"
    },
}


const ProfileFavorites = () => {

    return (
        <>
            <Paper elevation={3} style={classes.paper}>
                <Grid container spacing={3} direction="column">
                    <Grid item xs>
                        <Typography variant="h2" color="primary" align="center">Favorites</Typography>  
                    </Grid>
                    <Grid item xs container justify="center">
                        
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default ProfileFavorites
