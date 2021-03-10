import React, {useContext} from 'react';
import {JobsContext} from '../Contexts/JobsContext';
import JobCard from './JobCard';
import {AppBar, Toolbar, Grid } from "@material-ui/core";



const JobList = props => {

    const jobs = useContext(JobsContext);
    console.log(jobs)
    

    return (
      <>
        <AppBar position="static">
          <Toolbar/>
        </AppBar>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            {Object.keys(jobs).map(jobId => 
                <JobCard key={jobId} jobId={jobId} props={props}/>)}
            </Grid>
        </Grid>
      </>
    );
    
}

export default JobList;

