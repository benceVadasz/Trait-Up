import React, {useContext} from 'react';
import {JobsContext} from '../Contexts/JobsContext';
import JobCard from './JobCard';
import {AppBar, Toolbar, Grid } from "@material-ui/core";



const JobList = () => {

    const jobs = useContext(JobsContext);
    console.log(jobs)

    return (
      <>
        <AppBar position="static">
          <Toolbar/>
        </AppBar>
        <Grid container spacing={4}>
          <Grid item md={3}>
            {Object.keys(jobs).map(jobId => 
                <JobCard jobId={jobId}/>)}
            </Grid>
        </Grid>
      </>
    );
    
}

export default JobList;

