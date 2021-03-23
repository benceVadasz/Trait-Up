import React, { useContext } from "react";
import { JobsContext } from "../Contexts/JobsContext";
import JobCard from "./JobCard";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchForm from "./SearchForm";
import SearchForm2 from "./SearchForm2";

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
    },
  },
}));

const JobList = (props) => {
  let jobs = useContext(JobsContext);
  const classes = useStyles();

  function handleOnTypeFilter(e) {
    const value = e.target.innerHTML;
    const type = 'type';
    const filteredJobs = filterJobs(type, value)
    jobs = filteredJobs
  }
  
  function handleOnLocationFilter(e) {
    const value = e.target.innerHTML;
    const type = 'location';
    const filteredJobs = filterJobs(type, value)
    jobs = filteredJobs
  }

  function filterJobs(type, value) {
    let filteredJobs = [];
    jobs.map(job => {
      if (type === "type") {
        if (job.type.includes(value)) {
          filteredJobs.push()   
        } 
        else {
          if (job.location.includes(value)) {
            filteredJobs.push()   
          } 
        }
      }
    });
    return filteredJobs;
  }


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
          <Grid item lg={4}>
            <SearchForm onFilter={handleOnTypeFilter} jobs={jobs} />
          </Grid>

          <Grid item lg={4}>
            <SearchForm2 onFilter={handleOnLocationFilter} jobs={jobs} />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        className={classes.gridContainer}
        spacing={6}
        justify="center"
      >
        {Object.keys(jobs).map((jobId) => (
          <Grid item xs={5}>
            <JobCard key={jobId} jobs={jobs} jobId={jobId} props={props} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default JobList;
