import React, {useContext, useEffect, useState} from 'react';
import {Typography, Paper, Grid} from '@material-ui/core';
import 'fontsource-roboto';
import FavouriteCard from "./FavouriteCard";
import {useStoreActions, useStoreState} from "easy-peasy";
import axios from "axios";
import {BASE_URL} from "../constants";
import Spinner from "react-spinner-material";
import {useTheme} from '@material-ui/core/styles';
import {useMediaQuery} from '@material-ui/core';

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
  mobileLoad: {position: 'fixed', top: "50%", left: "50%", transform: "translate(-50%, -50%)"}
}


const ProfileFavorites = (props) => {
  const token = sessionStorage.getItem("token");
  const setFaves = useStoreActions((actions) => actions.setFavourites);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  useEffect(() => {
    setLoading(true)
    axios
      .get(`${BASE_URL}/Trait-Up-Backend/public/api/getFavouritesOfUser`,
        {headers: {Authorization: "Bearer " + token}})
      .then((response) => {
        setFaves(response.data.jobs);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${BASE_URL}/Trait-Up-Backend/public/api/jobs`,
      )
      .then((response) => {
        let firstTen = JSON.parse(response.data.jobs).slice(0, 4);
        setFavourites(firstTen);
        setLoading(false);
      });
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
        <Typography variant="h4" color="primary" align="center">Favorites</Typography>
        <Grid style={classes.favBox} container spacing={3} direction="row">
          {favourites.map((job) => (
              <FavouriteCard props={props} key={job['job_id']} job={job}/>
          ))}
        </Grid>
      </Paper>
  )
}

export default ProfileFavorites
