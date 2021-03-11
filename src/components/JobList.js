import React, {useContext} from 'react';
import {JobsContext} from '../Contexts/JobsContext';
import JobCard from './JobCard';
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import SearchForm from './SearchForm';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  },
  gridContainer2: {

    backgroundColor: "#859DF4",
  }
}));

const JobList = props => {

    const jobs = useContext(JobsContext);
    const classes = useStyles();
    

    return (
      <>
        <Grid container className={classes.gridContainer2} spacing={6} justify="center">
          <Grid item >
            <SearchForm jobs={jobs}/> 
          </Grid>
        </Grid>

        <Grid container className={classes.gridContainer} spacing={6} justify="center">
          {Object.keys(jobs).map(jobId => 
            <Grid item xs={5}>
                <JobCard key={jobId} jobId={jobId} props={props}/>
            </Grid>
          )}
          
        </Grid>
      </>
    );
    
}

export default JobList;

