import React, {useEffect, useState} from 'react';
import {Typography, Paper, Grid} from '@material-ui/core';
import 'fontsource-roboto';
import FavouriteCard from "./FavouriteCard";
import Spinner from "react-spinner-material";
import {useTheme} from '@material-ui/core/styles';
import {useMediaQuery} from '@material-ui/core';
import favouriteModel from "../models/favouriteModel";

const classes = {
  paper: {
    padding: "20px",
    margin: "20px",
    alignItems: "center",
    background: "#eceef7",
    height: "100%",
    marginBottom: 77
  },
  favBox: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-around",
    background: "#eceef7",
  },
  load: {position: 'fixed', top: "50%", left: "60%", transform: "translate(-50%, -50%)"},
  mobileLoad: {position: 'fixed', top: "50%", left: "50%", transform: "translate(-50%, -50%)"},
  label: {
    marginBottom: 40
  }
}


const ProfileFavorites = (props) => {

  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const getFavourites = favouriteModel.useStoreActions(actions => actions.getFavourites);
  const favouriteJobs = favouriteModel.useStoreState(state => state.favourites);


  useEffect(() => {
    setLoading(true)
    getFavourites()
    setLoading(false)
  }, []);

  if (loading)
    return (
      <div style={!isMobile ? classes.load : classes.mobileLoad}>
        <Spinner
          size={120}
          spinnerColor={"#333"}
          spinnerWidth={2}
          visible={true}
          color={'black'}/>
      </div>
    );

  return (
      <Paper elevation={3} style={classes.paper}>
        <Typography style={!isMobile ? classes.label : ''} variant={isMobile ? "h4" : "h2"} color="primary" align="center">Favorites</Typography>
        <Grid style={classes.favBox} container spacing={3} direction="row">
          {favouriteJobs.map((job) => (
              <FavouriteCard props={props} key={job['job_id']} job={job}/>
          ))}
        </Grid>
      </Paper>
  )
}

export default ProfileFavorites
