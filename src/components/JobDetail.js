import React from 'react';
import JobDetailPage from '../components/JobDetailPage';
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {useParams} from "react-router";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  }
}));

const JobDetail = () => {
    const classes = useStyles();
    const id = useParams();
  
    return (
        <>
        <Grid container className={classes.gridContainer}>
            <Grid item xs={12}>
                <JobDetailPage key={id} id={id}/>
            </Grid>
        </Grid>
        </>
    )
}

export default JobDetail;
