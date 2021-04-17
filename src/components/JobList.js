import React, {useContext, useState, useEffect} from "react";
import {JobsContext} from "../contexts/JobsContext";
import JobCard from "./JobCard";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SearchForm from "./SearchForm";
import SearchForm2 from "./SearchForm2";
import Spinner from "react-spinner-material";
import InfiniteScroll from 'react-infinite-scroll-component';
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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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

  const loadNextJobs = () => {
    setPage(prevOffset => prevOffset + 1)
  }

  useEffect(() => {
    console.log(page)
    axios
      .get(`${BASE_URL}/Trait-Up-Backend/public/api/jobs`,
        {
          params: {page}
        })
      .then((response) => {
        console.log(allJobs)
        const {data} = response;
        console.log(data)
        let result = JSON.parse(data["jobs"])
        let resultSpread = [...result];
        setHasMore(result.length > 0)
        resultSpread.forEach(res => {
          allJobs.push(res)
        })
        setJobs(allJobs);
        const newJobsData = {};

        result.forEach((job) => {
          newJobsData[job.id] = {
            id: job.id,
            type: job.type,
            url: job.url,
            created_at: job.created_at,
            company: job.company,
            location: job.location,
            title: job.title,
            description: job.description,
            how_to_apply: job.how_to_apply,
            company_logo: job.company_logo
          }
        });
        // setJobs(newJobsData);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleScroll = (e) => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
    if (bottom) {
      if (page >= 2) {
        setPage(prevOffset => prevOffset + 1)
      }
    }
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
            <SearchForm onFilter={handleOnTypeFilter} jobs={allJobs} clear={clearJob}/>
          </Grid>

          <Grid item lg={4}>
            <SearchForm2 onFilter={handleOnLocationFilter} locations={allLocations} clear={clearLocation}/>
          </Grid>
        </Grid>
      </Grid>
      <InfiniteScroll
        onScroll={handleScroll}
        dataLength={1000} //This is important field to render the next data
        next={loadNextJobs}
        hasMore={hasMore}
        loader={<h4 style={{textAlign: 'center'}}>Loading...</h4>}
        endMessage={
          <p style={{textAlign: 'center'}}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Grid
          container
          className={classes.gridContainer}
          spacing={6}
          justify="center"
        >
          {Object.keys(jobs).map((jobId, index) => (
            <Grid key={jobId} item xs={5}>
              <JobCard key={jobId} jobs={jobs} jobId={jobId} props={props}/>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
      <div>{loading && 'Loading...'}</div>

    </>
  );
};

export default JobList;
