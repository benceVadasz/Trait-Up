import React, {useState, useEffect, Suspense, lazy} from "react";
import loadable from '@loadable/component'
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useTheme} from '@material-ui/core/styles';
import {useMediaQuery} from '@material-ui/core';
import jobModel from "../models/jobModel";
import favouriteModel from "../models/favouriteModel";
import FilterArea from "./FilterArea";
import applicationModel from "../models/applicationModel";
import MobileJobList from "./MobileJobList";
import Loading from "./Loading";
import {Pagination} from "@material-ui/lab";
const JobCard = lazy(() => import("./JobCard"));

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
  },
  pagBox: {
    display: 'flex',
    justifyContent: 'center',
    margin: '30px 10px 30px 10px'
  }
}));

const JobList = () => {
  const classes = useStyles();
  const [typeFilter, setTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const fetchJobs = jobModel.useStoreActions(actions => actions.fetchJobs);
  const getFavouritesOfUser = favouriteModel.useStoreActions(actions => actions.getFavourites);
  const getApplications = applicationModel.useStoreActions(actions => actions.getApplications);
  const easyJobs = jobModel.useStoreState(state => state.jobs);
  const loading = jobModel.useStoreState(state => state.loading);
  const filter = jobModel.useStoreActions(actions => actions.filter);
  const applications = applicationModel.useStoreState(state => state.applications);

  function filterJobType(e, value) {
    if (sessionStorage.getItem('token')) getFavouritesOfUser()
    e.preventDefault()
    setTypeFilter(value);
    filter({'type': value, 'location': locationFilter})
  }

  function filterLocation(e, value) {
    if (sessionStorage.getItem('token')) getFavouritesOfUser()
    e.preventDefault()
    setLocationFilter(value);
    filter({'type': typeFilter, 'location': value})
  }

  function clearJob(e) {
    e.preventDefault()
    if (e.type === 'blur') {
      setTypeFilter("");
      filter({'type': '', 'location': locationFilter})
    }
  }

  function clearLocation(e) {
    e.preventDefault()
    if (e.type === 'blur') {
      setLocationFilter("");
      filter({'type': typeFilter, 'location': ''})
    }
  }

  useEffect(() => {
    fetchJobs(page)
    if (sessionStorage.getItem('token')) getFavouritesOfUser()
    if (sessionStorage.getItem('token')) getApplications()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paginate = (e, value) => {
    setPage(value)
    fetchJobs(value)
  }


  if (loading)
    return (
      <div className={classes.load}>
        <Loading/>
      </div>
    );

  return (
    <Suspense fallback={<Loading/>}>
      <FilterArea handleOnTypeFilter={filterJobType} clearJob={clearJob}
                  handleOnLocationFilter={filterLocation} clearLocation={clearLocation}
                  jobs={easyJobs}/>
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
      <div className={classes.pagBox}>
        {easyJobs.length >= 50 ? <Pagination

          count={2}
          color={"primary"}
          variant={"outlined"}
          defaultPage={page}
          onChange={paginate}
        /> : null}
      </div>
    </Suspense>
  );
};

export default JobList;
