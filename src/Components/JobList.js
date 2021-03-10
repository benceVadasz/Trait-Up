import React, {useContext} from 'react';
import {JobsContext} from '../Contexts/JobsContext';
import JobCard from './JobCard';
import {AppBar, Toolbar, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import SearchFrom from './SearchForm';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  }
}));

const JobList = props => {

    const jobs = useContext(JobsContext);
    const classes = useStyles();
    

    return (
      <>
        <AppBar position="static">
          <Toolbar/>
        </AppBar>
        <Grid container className={classes.gridContainer} spacing={6} justify="center">
          
            {Object.keys(jobs).map(jobId => 
            <Grid item xs={12} sm={6} md={4}>
                <JobCard key={jobId} jobId={jobId} props={props}/>
            </Grid>
            )}
          
        </Grid>
      </>
    );
    
}

export default JobList;

