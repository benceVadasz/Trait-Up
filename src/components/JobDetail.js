import {JobsContext} from '../Contexts/JobsContext';
import React, {useContext} from 'react';
import JobDetailPage from '../components/JobDetailPage';
import {AppBar, Toolbar, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {JobContext} from '../Contexts/JobDetailContext';

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
    const [job, saveJob] = useContext(JobContext);
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
