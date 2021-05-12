import React, {useContext, useState, useEffect} from "react";
import {JobsContext} from "../contexts/JobsContext";
import JobCard from "./JobCard";
import {Button, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SearchForm from "./SearchForm";
import SearchForm2 from "./SearchForm2";
import Spinner from "react-spinner-material";
import axios from "axios";
import {BASE_URL} from "../constants";
import {useStoreActions, useStoreState} from "easy-peasy";
import InfiniteScroll from 'react-infinite-scroll-component';
import {useTheme} from '@material-ui/core/styles';
import {useMediaQuery} from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";
import ClearIcon from '@material-ui/icons/Clear';

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
  mobileDemo: {
    height: 80,
    marginBottom: 120,
    marginRight: 160,
  },
  typeSearch: {
    display: 'flex',
    width: '100%',
    marginLeft: 100,
  },
  button: {
    width: 120,
    height: 30,
    fontSize: "15px",
    color: "white",
    alignSelf: 'flex-end',
    marginLeft: 50,
    marginTop: 10,
  },
  search: {
    alignSelf: 'flex-start',
    left: 10,
    marginLeft: 62,
  }
}));

const JobList = () => {
  let {jobs, setJobs, allJobs, allLocations, loading} = useContext(JobsContext);
  const classes = useStyles();
  const token = sessionStorage.getItem("token");
  const [typeFilter, setTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [lengthOfJobs, setLengthOfJobs] = useState(50);
  const setFaves = useStoreActions((actions) => actions.setFavourites);
  const [isBottom, setIsBottom] = useState(false);
  const [applications, setApplications] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (token) {
      axios
        .get(`${BASE_URL}/Trait-Up-Backend/public/api/readUsersApplications`,
          {headers: {Authorization: "Bearer " + token}})
        .then((response) => {
          let result = response.data.application;
          const applicationIds = [];
          result.forEach((job) => {
            applicationIds.push(job.job_id)
          })
          console.log(applicationIds)

          setApplications(applicationIds);
        });
    }
  }, []);


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

  async function clearJob(e) {
    if (e.type === 'blur') {
      setTypeFilter("");
      const filteredJobs = await filterJobs("location", locationFilter);
      setJobs(filteredJobs);
      setHasMore(true);
    }
  }

  function clearLocation(e) {
    if (e.type === 'blur') {
      setLocationFilter("");
      setJobs(filterJobs("jobType", typeFilter));
      setHasMore(true);
    }
  }

  function filterJobs(filterType, value) {
    console.log(filterType, value)
    setHasMore(false);
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

  const setBottomFalse = () => {
    setIsBottom(false)
  }

  useEffect(() => {
    axios
      .get(`${BASE_URL}/Trait-Up-Backend/public/api/jobs`,
        {
          params: {page}
        })
      .then((response) => {
        const {data} = response;
        let result = JSON.parse(data["jobs"])
        let resultSpread = [...result];
        setHasMore(result.length > 0)
        resultSpread.forEach(res => {
          allJobs.push(res)
        })
        setJobs(allJobs);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleScroll = (e) => {
    if (e.target.scrollingElement.scrollHeight -
      e.target.scrollingElement.scrollTop === e.target.scrollingElement.clientHeight) {
      setIsBottom(true)
      if (hasMore) {
        setPage(prevOffset => prevOffset + 1)
      }
    }
  }

  useEffect(() => {
    if (token) {
      axios
        .get(`${BASE_URL}/Trait-Up-Backend/public/api/getFavouritesOfUser`,
          {headers: {Authorization: "Bearer " + token}})
        .then((response) => {
          setFaves(response.data.jobs);
        });
    }
  }, []);

  if (loading)
    return (
      <div className={classes.load}>
        <Spinner
          size={120}
          visible={true}
        />
      </div>
    );

  return (
    <>

      <Grid container justify="center">
        <Grid
          container
          className={!isMobile ? classes.demo : classes.mobileDemo}
          alignItems="center"
          justify="center"
          style={{borderRadius: 20}}
        >
          <Grid className={isMobile ? classes.typeSearch : ''} item lg={4}>
            <div className={isMobile ? classes.search : ''}>
            <SearchForm  onFilter={handleOnTypeFilter}
                        jobs={allJobs} clear={clearJob}/>
            </div>
            {isMobile ? <Button
              variant="contained"
              color="secondary"
              size="small"
              className={classes.button}
              endIcon={<ClearIcon/>}
              onClick={setJobs(allJobs)}>
              Clear
            </Button> : null}
          </Grid>

          <Grid item lg={4}>
            <SearchForm2 onFilter={handleOnLocationFilter} locations={allLocations} clear={clearLocation}/>
          </Grid>
        </Grid>
      </Grid>

      <InfiniteScroll
        onScroll={handleScroll}
        dataLength={lengthOfJobs} //This is important field to render the next data
        next={setBottomFalse}
        hasMore={hasMore}
        loader={<h4 style={{textAlign: 'center'}}>Loading...</h4>}
        endMessage={
          <p style={{textAlign: 'center'}}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div>
          <Grid
            container
            className={classes.gridContainer}
            spacing={6}
            justify="center"
          >
            {!isMobile ?
              jobs.map((job, index) => (
                <Grid key={index} item xs={5}>
                  {applications.includes(job.id) ? <JobCard job={job} key={index} isApplied={true}/> :
                    <JobCard job={job} key={index}/>}
                </Grid>
              ))
              :
              jobs.map((job, index) => (
                <JobCard job={job} key={index}/>
              ))}
          </Grid>
        </div>
      </InfiniteScroll>

      <div>{loading && 'Loading...'}</div>

    </>
  );
};

export default JobList;
