import React, {useState, useEffect, useRef} from "react";
import JobCard from "./JobCard";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Spinner from "react-spinner-material";
import {useTheme} from '@material-ui/core/styles';
import {useMediaQuery} from '@material-ui/core';
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import jobModel from "../models/jobModel";
import favouriteModel from "../models/favouriteModel";
import FilterArea from "./FilterArea";
import applicationModel from "../models/applicationModel";
import filterModel from "../models/filterModel";

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
  const classes = useStyles();
  const [typeFilter, setTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const fetchJobs = jobModel.useStoreActions(actions => actions.fetchJobs);
  const setJobs = jobModel.useStoreActions(actions => actions.setJobs);
  const getFavouritesOfUser = favouriteModel.useStoreActions(actions => actions.getFavourites);
  const getApplications = applicationModel.useStoreActions(actions => actions.getApplications);
  const easyJobs = jobModel.useStoreState(state => state.jobs);
  const filter = jobModel.useStoreActions(actions => actions.filter);
  const applications = applicationModel.useStoreState(state => state.applications);
  const [loading, setLoading] = useState(false);
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  );


  async function handleOnTypeFilter(e) {
    const value = e.target.innerHTML;
    setTypeFilter(value);
    await filter({'type' : value, 'location': locationFilter})
    // console.log(filteredArray)
    // setJobs(filteredArray);
  }

  function handleOnLocationFilter(e) {
    const value = e.target.innerHTML;
    setLocationFilter(value);
    filter({'type' : typeFilter, 'location': value})
    const type = typeFilter !== "" ? 'both' : 'location';
    // setJobs(filteredArray);
  }

  async function clearJob(e) {
    if (e.type === 'blur') {
      console.log('in type clear')
      setTypeFilter("");
      filter({'type' : '', 'location': locationFilter})
      // console.log(filteredArray)
      // setJobs(filteredArray);
    }
  }

  async function clearLocation(e) {
    if (e.type === 'blur') {
      console.log('in location clear')
      setLocationFilter("");
      filter({'type' : typeFilter, 'location': ''})
      // setJobs(filteredArray);
    }
  }

  function filterJobs(filterType, value, jobListToFilter) {
    console.log(filterType, value)
    setJobs(easyJobs)
    let filteredJobs = [];
    if (jobListToFilter.length > 0) {
      for (let job of jobListToFilter) {
        if (filterType === 'both') {
          let splitType = value.split(/[ ,]+/);
          let queryKeyWord = splitType[0];
          if (job.description.includes(queryKeyWord) && job.location.includes(value)) {
            filteredJobs.push(job)
          }
        } else if (filterType === "jobType") {
          let splitType = value.split(/[ ,]+/);
          let queryKeyWord = splitType[0];
          if (job.description.includes(queryKeyWord)) {
            filteredJobs.push(job)
          }
        } else {
          if (job.location.includes(value)) {
            filteredJobs.push(job)
          }
        }
      }
    }
    console.log(filteredJobs)
    return filteredJobs;
  }

  useEffect(() => {
    setLoading(true)
    fetchJobs()
    if (sessionStorage.getItem('token')) getFavouritesOfUser()
    if (sessionStorage.getItem('token')) getApplications()
    setLoading(false)
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

      <FilterArea handleOnTypeFilter={handleOnTypeFilter} clearJob={clearJob}
                  handleOnLocationFilter={handleOnLocationFilter} clearLocation={clearLocation}/>
      <div>
        <Grid
          container
          className={classes.gridContainer}
          spacing={6}
          justify="center"
        >
          {!isMobile ?
            easyJobs.map((job, index) => (
              <Grid key={index} item xs={5}>
                {applications.includes(job.id) ? <JobCard job={job} key={index} isApplied={true}/> :
                  <JobCard job={job} key={index}/>}
              </Grid>
            ))
            :
            <div style={{width: "100%", height: "120vh"}}>
              <AutoSizer>
                {({width, height}) => (
                  <List
                    width={width}
                    height={height}
                    rowHeight={cache.current.rowHeight}
                    deferredMeasurementCache={cache.current}
                    rowCount={easyJobs.length}
                    rowRenderer={({key, index, style, parent}) => {
                      const job = easyJobs[index];

                      return (
                        <CellMeasurer
                          key={key}
                          cache={cache.current}
                          parent={parent}
                          columnIndex={0}
                          rowIndex={index}
                        >
                          <div style={style}>
                            <JobCard job={job} key={index}/>
                          </div>
                        </CellMeasurer>
                      );
                    }}
                  />
                )}
              </AutoSizer>
            </div>
          }
        </Grid>

      </div>
    </>
  );
};

export default JobList;
