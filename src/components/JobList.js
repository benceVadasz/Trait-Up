import React, {useContext, useEffect, useState} from "react";
import {JobsContext} from "../contexts/JobsContext";
import JobCard from "./JobCard";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SearchForm from "./SearchForm";
import SearchForm2 from "./SearchForm2";
import Spinner from "react-spinner-material";
import axios from "axios";
import {BASE_URL} from "../constants";

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
  const classes = useStyles();
  const [typeFilter, setTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [favourites, setFavourites] = useState([]);

  function handleOnTypeFilter(e) {
    const value = e.target.innerHTML;
    setTypeFilter(value);
    const type = locationFilter !== "" ? 'both' : 'jobType';
    setJobs(filterJobs(type, value));
  }

  function handleOnLocationFilter(e) {
    const value = e.target.innerHTML;
    setLocationFilter(value);
    const type = typeFilter !== "" ? 'both' : 'location';
    setJobs(filterJobs(type, value));
  }

  function clearJob(e) {
    if (e.type === 'blur') {
      setJobs(filterJobs("location", locationFilter));
    }
  }

  function clearLocation(e) {
    if (e.type === 'blur') {
      setJobs(filterJobs("jobType", typeFilter));
    }
  }

  function filterJobs(filterType, value) {
    console.log(filterType);
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
          let splitType = value.split(/[ ,]+/);
          let queryKeyWord = splitType[0];
          if (allJobs[i].location.includes(queryKeyWord)) {
            filteredJobs.push(allJobs[i])
          }
        }
      }
    }
    return filteredJobs;
  }

  const filterOutIds = (favArray) => {
    const res = []
    favArray.forEach(fav => {
      res.push(fav.job_id)
    })
    return res;
  }
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${BASE_URL}/Trait-Up-Backend/public/api/getFavouritesOfUser`,
        {headers: {Authorization: "Bearer " + token}})
      .then((response) => {
        setFavourites(filterOutIds(response.data.mail));
      });

  }, []);

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
        {Object.keys(jobs).map((jobId) => (
          <Grid key={jobId} item xs={5}>
            <JobCard key={jobId} jobs={jobs} jobId={jobId} props={props} favourites={favourites} setFavourites={setFavourites}/>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
;

export default JobList;
