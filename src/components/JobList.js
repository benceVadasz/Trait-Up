import React, {useContext} from 'react';
import {JobsContext, JobsProvider} from '../Contexts/JobsContext';
import JobCard from './JobCard';
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import SearchForm from './SearchForm';
import SearchForm2 from './SearchForm2';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  },
  demo: {
    height: 80,
    background: "#859DF4",
    marginTop: 40,
    marginBottom: 40,
    [theme.breakpoints.up("lg")]: {
      width: 600,
      
    }
  }
  
}));

const JobList = props => {

    const jobs = useContext(JobsContext);
    const classes = useStyles();
    

    return (
      <>

 
      <Grid container justify="center" spacing={12}>
         
      <Grid
          container
          className={classes.demo}
          alignItems="center"
          justify="center"
          style={{ borderRadius: 20 }}     
            
        >
           {/* <Typography variant="body2" color="textSecondary" component="p">Search for your next job  </Typography> */}
          
          <Grid item lg={4}>
            <SearchForm jobs={jobs}/> 
          </Grid>


          <Grid item lg={4} >
            <SearchForm2  jobs={jobs}/>
          </Grid>
          </Grid>
        </Grid>
        

        <Grid container className={classes.gridContainer} spacing={6} justify="center">
          {Object.keys(jobs).map(jobId => 
            <Grid item xs={5}>
                <JobCard key={jobId} jobs={jobs} jobId={jobId} props={props}/>
            </Grid>
          )}
          
        </Grid>


      </>
    );
    
}

export default JobList;

