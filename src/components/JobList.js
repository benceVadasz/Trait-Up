import React, {useState, useEffect} from "react";
import JobCard from "./JobCard";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Spinner from "react-spinner-material";
import {useTheme} from '@material-ui/core/styles';
import {useMediaQuery} from '@material-ui/core';
import jobModel from "../models/jobModel";
import favouriteModel from "../models/favouriteModel";
import FilterArea from "./FilterArea";
import applicationModel from "../models/applicationModel";
import MobileJobList from "./MobileJobList";

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
  const getFavouritesOfUser = favouriteModel.useStoreActions(actions => actions.getFavourites);
  const getApplications = applicationModel.useStoreActions(actions => actions.getApplications);
  const easyJobs = jobModel.useStoreState(state => state.jobs);
  const filter = jobModel.useStoreActions(actions => actions.filter);
  const applications = applicationModel.useStoreState(state => state.applications);
  const [loading, setLoading] = useState(false);

  function handleOnTypeFilter(e) {
    setLoading(true)
    const value = e.target.innerHTML;
    setTypeFilter(value);
    filter({'type': value, 'location': locationFilter})
    setLoading(false)
  }

  function handleOnLocationFilter(e) {
    setLoading(true)
    const value = e.target.innerHTML;
    setLocationFilter(value);
    filter({'type': typeFilter, 'location': value})
    setLoading(false)
  }

  function clearJob(e) {
    if (e.type === 'blur') {
      setLoading(true)
      setTypeFilter("");
      filter({'type': '', 'location': locationFilter})
      setLoading(false)
    }
  }

  function clearLocation(e) {
    if (e.type === 'blur') {
      setLoading(true)
      setLocationFilter("");
      filter({'type': typeFilter, 'location': ''})
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchJobs()
    if (sessionStorage.getItem('token')) getFavouritesOfUser()
    if (sessionStorage.getItem('token')) getApplications()
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <MobileJobList jobs={easyJobs}/>
          }
        </Grid>

      </div>
    </>
  );
};

export default JobList;
