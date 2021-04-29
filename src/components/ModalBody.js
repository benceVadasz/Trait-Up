import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from "axios";
import {BASE_URL} from "../constants";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#859DF4",
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ModalBody() {
  const classes = useStyles();
  const [personalData, setPersonalData] = useState();
  const token = sessionStorage.getItem("token");
  const [isFilled, setFill] = useState(false);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));



  const fetchUserData = () => {
    axios
      .get(`${BASE_URL}/Trait-Up-Backend/public/api/getUserDatasById`,
        {headers: {Authorization: "Bearer " + token}})
      .then((response) => {

        setPersonalData(response.data.personalData);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, [setPersonalData])

  const fillAutomatically = () => {
    {isFilled ? setFill(false) : setFill(true)};
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar aria-label="recipe" className={classes.avatar}>
          TUp
        </Avatar>
        <Typography component="h1" variant="h5">
          Let's start the application
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          {!isFilled ?
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  {...register("firstName")}
                  required={true}
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="Full name"
                  autoFocus
                />

              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  {...register("email")}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  {...register("address")}
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  {...register("phone")}
                  fullWidth
                  name="phone"
                  label="Phone number"
                  id="phone"
                />
              </Grid>
            </Grid>
            :
            Object.keys(personalData).map(key => (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    value={personalData[key].name}
                    required
                    fullWidth
                    id="firstName"
                    label="Full name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    value={personalData[key].email}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    value={personalData[key].address}
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="address"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    value={personalData[key].phone_number}
                    fullWidth
                    name="phone"
                    label="Phone number"
                    id="phone"
                  />
                </Grid>
              </Grid>
            ))}


          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" onClick={fillAutomatically} />}
              label="Fill in automatically"
            />
          </Grid>
          <input type="submit" />

        </form>
      </div>
    </Container>
  );
}
