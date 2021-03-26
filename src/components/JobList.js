import React, {useContext} from "react";
import {JobsContext} from "../contexts/JobsContext";
import JobCard from "./JobCard";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SearchForm from "./SearchForm";
import SearchForm2 from "./SearchForm2";
import Spinner from "react-spinner-material";

const useStyles = makeStyles((theme) => ({
  load: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  },
  demo: {
    height: 80,
    marginTop: 40,
    marginBottom: 40,
    [theme.breakpoints.up("lg")]: {
      width: 600,
    },
  },
}));

const JobList = (props) => {

  let {jobs, setJobs, allJobs, allLocations, loading} = useContext(JobsContext);
  console.log(loading);
  const classes = useStyles();

  function handleOnTypeFilter(e) {
    const value = e.target.innerHTML;
    const type = 'type';
    setJobs(filterJobs(type, value));
  }

  function handleOnLocationFilter(e) {
    const value = e.target.innerHTML;
    const type = 'location';
    setJobs(filterJobs(type, value));
  }

  function filterJobs(type, value) {
    setJobs(allJobs)
    let filteredJobs = [];
    if (allJobs.length > 0) {
      for (let i in allJobs) {
        if (type === "type") {
          let splitType = value.split(' ');
          let queryKeyWord = splitType[0];
          if (allJobs[i].description.includes(queryKeyWord)) {
            filteredJobs.push(allJobs[i])
          }
        } else {
          if (allJobs[i].location.includes(value)) {
            filteredJobs.push(allJobs[i])
          }
        }
      }
      ;
    }
    return filteredJobs;
  }

  if (loading)
    return (
      <div className={classes.load}>
        <Spinner
          size={120}
          spinnerColor={"#333"}
          spinnerWidth={2}
          visible={true}
        />
      </div>
    );

  return (
    <>
      <Grid container justify="center">
        <Grid
          container
          className={classes.demo}
          alignItems="center"
          justify="center"
          style={{borderRadius: 20}}
        >
          <Grid item lg={4}>
            <SearchForm onFilter={handleOnTypeFilter} jobs={allJobs}/>
          </Grid>

          <Grid item lg={4}>
            <SearchForm2 onFilter={handleOnLocationFilter} locations={allLocations}/>
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
          <Grid key={jobId} item xs={5}>
            <JobCard key={jobId} jobs={jobs} jobId={jobId} props={props}/>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default JobList;
