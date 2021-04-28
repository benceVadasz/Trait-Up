import React from 'react';
import  {useEffect, useState } from 'react';
import { Typography, Paper, Grid } from '@material-ui/core';
import 'fontsource-roboto';
import axios from "axios";
import {BASE_URL} from "../constants";

const classes = {
    paper: {
        padding: "20px", 
        margin: "20px", 
        alignItems: "center", 
        background: "#eceef7",
    },
}

const ProfileApplications = () => {

    const [applications, setApplications] = useState({});
    const token = sessionStorage.getItem("token");
    console.log(applications)

    const fetchApplictions = () => {
    axios
      .get(`${BASE_URL}/Trait-Up-Backend/public/api/readUsersApplications`,
        {headers: {Authorization: "Bearer " + token}})
      .then((response) => {
        let result = response.data.application;
        const applicationsWithJobId = {};
        result.forEach((job) => {
          applicationsWithJobId[job.job_id] = {
            id: job.id,
            type: job.type,
            company: job.company,
            location: job.location,
            title: job.title,
          }
        });
        setApplications(applicationsWithJobId);
      });
  };

    useEffect(() => {
      fetchApplictions();

    }, [setApplications])

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
