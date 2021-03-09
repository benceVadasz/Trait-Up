import React, {useContext} from 'react';
import {JobsContext} from '../Contexts/JobsContext';
import JobCard from '../Components/JobCard';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {AppBar, Toolbar, Grid } from "@material-ui/core";



const Jobs = () => {

    const jobs = useContext(JobsContext);
    console.log(jobs)

    return (
      <>
        <AppBar position="static">
          <Toolbar/>
        </AppBar>
        <Grid container spacing={3}>
        {Object.keys(jobs).map(jobId => 
            <JobCard jobId={jobId}/>)}
        </Grid>
      </>
    );
    
}

export default Jobs;
