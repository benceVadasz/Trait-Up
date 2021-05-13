import React from 'react';
import  {useEffect, useState } from 'react';
import { Typography, Paper, Grid } from '@material-ui/core';
import 'fontsource-roboto';
import axios from "axios";
import {BASE_URL} from "../constants";
import {makeStyles} from "@material-ui/core/styles";
import JobCard from "./JobCard";

const classes = {

}

const useStyles = makeStyles((theme) => ({
  load: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  paper: {
    padding: "20px",
    margin: "20px",
    alignItems: "center",
    background: "#eceef7",
    height: '100vh'
  },
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  },
  demo: {
    height: 80,
    marginTop: 40,
    marginBottom: 40,
    [theme.breakpoints.up("lg")]: {
      width: 600,
    },

  },
}));

const ProfileApplications = (props) => {

    const [applications, setApplications] = useState([]);
    const token = sessionStorage.getItem("token");
    const classes = useStyles();


    const fetchApplications = () => {
    axios
      .get(`${BASE_URL}/Trait-Up-Backend/public/api/readUsersApplications`,
        {headers: {Authorization: "Bearer " + token}})
      .then((response) => {
        let result = response.data.application;
        console.log(result)
        // const applicationsWithJobId = {};
        // result.forEach((job) => {
        //   applicationsWithJobId[job.job_id] = {
        //     id: job.id,
        //     type: job.type,
        //     company: job.company,
        //     location: job.location,
        //     title: job.title,
        //     company_logo: job.company_logo,
        //     created_at: job.created_at
        //   }
        // });
        setApplications(result);
      });
  };

    useEffect(() => {
      fetchApplications();
    }, [])

    return (
        <>
            <Paper elevation={3} className={classes.paper}>
                <Grid container spacing={3} direction="column">
                    <Grid item xs>
                        <Typography variant="h4" color="primary" align="center">Applications</Typography>
                    </Grid>
                    <Grid item xs container justify="center">

                    </Grid>
                  <Grid
                    container
                    className={classes.gridContainer}
                    spacing={6}
                    justify="center"
                  >
                    {applications.map((job, index) => (
                        <JobCard key={index} job={job} props={props} isApplied={true}/>
                    ))}
                  </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default ProfileApplications
