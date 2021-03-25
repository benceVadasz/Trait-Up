import React, {useContext, useEffect} from 'react';
import {Button, Typography, Paper, Grid } from '@material-ui/core';
import {BASE_URL} from "../constants";
import 'fontsource-roboto';
import JobList from './JobList';
import axios from "axios";

const classes = {
    paper: {
        padding: "20px", 
        margin: "20px", 
        alignItems: "center", 
        background: "#eceef7",
    },
}




const ProfileFavorites = () => {

    useEffect(() => {
        axios
            .get(`${BASE_URL}/Trait-Up-Backend/public/api/getFavouritesOfUser`)
            .then((response) => {
                const {data} = response;
            });

    }, []);

    return (
        <>
            <Paper elevation={3} style={classes.paper}>
                <Grid container spacing={3} direction="column">
                    <Grid item xs>
                        <Typography variant="h2" color="primary" align="center">Favorites</Typography>  
                    </Grid>
                    <Grid item xs>
                        <JobList />
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default ProfileFavorites
