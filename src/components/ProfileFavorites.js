import React, {useContext, useEffect, useState} from 'react';
import {Typography, Paper, Grid} from '@material-ui/core';
import {BASE_URL} from "../constants";
import 'fontsource-roboto';
import axios from "axios";
import FavouriteCard from "./FavouriteCard";
import {JobsContext} from "../contexts/JobsContext";

const classes = {
  paper: {
    padding: "20px",
    margin: "20px",
    alignItems: "center",
    background: "#eceef7",
    height: "100%"
  },
  favBox: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-around",
    background: "#eceef7",
  },
}


const ProfileFavorites = (props) => {
  const token = sessionStorage.getItem("token");
  const [favourites, setFavourites] = useState([]);
  let {jobs, setJobs, allJobs, allLocations, loading} = useContext(JobsContext);
  console.log(jobs)
  useEffect(() => {
    axios
      .get(`${BASE_URL}/Trait-Up-Backend/public/api/getFavouritesOfUser`,
        {headers: {Authorization: "Bearer " + token}})
      .then((response) => {
        setFavourites(response.data.mail)
      });

  }, []);

  return (
    <>
      <Paper elevation={3} style={classes.paper}>
        <Typography variant="h2" color="primary" align="center">Favorites</Typography>
        <Grid style={classes.favBox} container spacing={3} direction="row">
          {favourites.map((job) => (
            <Grid key={job['job_id']} item xs={5}>
              <FavouriteCard key={job['job_id']} job={job} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  )
}

export default ProfileFavorites
