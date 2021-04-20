import React, {useEffect, useState} from 'react';
import {Typography, Paper, Grid} from '@material-ui/core';
import 'fontsource-roboto';
import FavouriteCard from "./FavouriteCard";
import {useStoreActions, useStoreState} from "easy-peasy";
import axios from "axios";
import {BASE_URL} from "../constants";

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
  const setFaves = useStoreActions((actions) => actions.setFavourites);
  const favouriteJobs = useStoreState((state) => state.favourites);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/Trait-Up-Backend/public/api/getFavouritesOfUser`,
        {headers: {Authorization: "Bearer " + token}})
      .then((response) => {
        setFaves(response.data.jobs);
      });
  }, [favouriteJobs]);

  return (
    <>
      <Paper elevation={3} style={classes.paper}>
        <Typography variant="h2" color="primary" align="center">Favorites</Typography>
        <Grid style={classes.favBox} container spacing={3} direction="row">
          {favouriteJobs.map((job) => (
            <Grid key={job['job_id']} item xs={5}>
              <FavouriteCard props={props} key={job['job_id']} job={job}/>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  )
}

export default ProfileFavorites
