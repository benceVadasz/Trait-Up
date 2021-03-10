import {JobsContext} from '../Contexts/JobsContext';
import React, {useContext} from 'react';
import JobDetailPage from '../components/JobDetailPage';
import {AppBar, Toolbar, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  }
}));

const JobDetail = props => {
    const { history, match } = props;
    const { params } = match;
    const { jobId } = params;
    const jobs = useContext(JobsContext);
    const currentJob = jobs[jobId];
    const classes = useStyles();

    

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
