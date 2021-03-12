import React from 'react';
import JobDetailPage from '../components/JobDetailPage';
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  }
}));

const JobDetail = props => {
    const classes = useStyles();
    const currentJob = JSON.parse(localStorage.getItem("job"))
  
    return (
        <>
        <Grid container className={classes.gridContainer}>
            <Grid item xs={12}>
                <JobDetailPage key={currentJob.id} job={currentJob} props={props}/>
            </Grid>
        </Grid>
        </>
    )
}

export default JobDetail;
