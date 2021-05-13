import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from "axios";
import {BASE_URL} from "../constants";
import {Grid} from "@material-ui/core";
import JobCard from "./JobCard";
import Typography from "@material-ui/core/Typography";
import Spinner from "react-spinner-material";


function Features() {
  const useStyles = makeStyles((theme) => ({
    root: {
      // flexGrow: 1,
      borderBottom: 'none',
    },
    load: {position: 'fixed', top: "50%", left: "50%", transform: "translate(-50%, -50%)"},
    paper: {
      margin: 'auto',
      width: '100%',
      minHeight: '100vh',
      borderBottom: 'none',
      borderTop: 'none',
      background: '#F6F6F6',
      display: 'flex',
      flexFlow: 'column',
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 77
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    np: {
      marginTop: 10
    }
  }));

  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [newJobs, setNewJobs] = useState([]);



  useEffect(() => {
    setLoading(true)
    axios
      .get(`${BASE_URL}/Trait-Up-Backend/public/api/jobs`,
      )
      .then((response) => {
        let firstTen = JSON.parse(response.data.jobs).slice(0, 10);
        setNewJobs(firstTen);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Paper className={classes.paper} width="15%">
        <Typography className={classes.np} gutterBottom variant="h5">
          New positions for you
        </Typography>
        <div className={classes.load}>

          <Spinner
            size={120}
            spinnerColor={"#333"}
            spinnerWidth={2}
            visible={true}
            color={'black'}/>
        </div>
      </Paper>
    );

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <Paper className={classes.paper} width="15%">
        <Typography className={classes.np} gutterBottom variant="h5">
          New positions for you
        </Typography>
        {newJobs.map((job) => (
            <JobCard job={job} key={job.id}/>
        ))}
      </Paper>
    </div>
  );
}


export default Features
