import React, {useContext, useState, useRef, useCallback } from "react";
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

  let {jobs, setJobs, allJobs, allLocations, loading, setPageNumber, hasMore} = useContext(JobsContext);
  const classes = useStyles();

  const [typeFilter, setTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  function handleOnTypeFilter(e) {
    const value = e.target.innerHTML;
    console.log(value)
    setTypeFilter(value);
    const type = locationFilter !== "" ? 'both' : 'jobType';
    setJobs(filterJobs(type, value));
  }

  function handleOnLocationFilter(e) {
    const value = e.target.innerHTML;
    setLocationFilter(value);
    const type = typeFilter !== "" ? 'both' : 'location';
    const results = filterJobs(type, value);
    setJobs(results);
  }

  async function clearJob(e) {
    if (e.type === 'blur') {
      setTypeFilter("");
      const filteredJobs = await filterJobs("location", locationFilter);
      setJobs(filteredJobs);
    }
  }

    function clearLocation(e) {
    if (e.type === 'blur') {
      setLocationFilter("");
      setJobs(filterJobs("jobType", typeFilter));
      console.log(jobs);
    }
  }

  function filterJobs(filterType, value) {
    setJobs(allJobs)
    let filteredJobs = [];
    if (allJobs.length > 0) {
      for (let i in allJobs) {
        if (filterType === 'both') {
          let splitType = value.split(/[ ,]+/);
          let queryKeyWord = splitType[0];
          if (allJobs[i].description.includes(queryKeyWord) && allJobs[i].location.includes(value)) {
            filteredJobs.push(allJobs[i])
          }
        } else if (filterType === "jobType") {
          let splitType = value.split(/[ ,]+/);
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
    }
    return filteredJobs;
  }

  const observer = useRef(null);
  const lastJobRef = useCallback(node => {
    console.log('here')
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])


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
            <SearchForm onFilter={handleOnTypeFilter} jobs={allJobs} clear={clearJob}/>
          </Grid>

          <Grid item lg={4}>
            <SearchForm2 onFilter={handleOnLocationFilter} locations={allLocations} clear={clearLocation}/>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        className={classes.gridContainer}
        spacing={6}
        justify="center"
      >
        {Object.keys(jobs).map((jobId, index) => (
          index === 49 ?
          <Grid ref={lastJobRef} key={jobId} item xs={5}>
            <JobCard key={jobId} jobs={jobs} jobId={jobId} props={props}/>
          </Grid> :
            <Grid key={jobId} item xs={5}>
              <JobCard key={jobId} jobs={jobs} jobId={jobId} props={props}/>
            </Grid>
        ))}
      </Grid>
      <div>{loading && 'Loading...'}</div>
    </>
  );
};

export default JobList;
