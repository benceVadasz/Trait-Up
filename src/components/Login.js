import React, {useState} from "react";
import axios from 'axios';
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { BASE_URL } from "../constants";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {useMediaQuery} from '@material-ui/core';
import Loading from "./Loading";


function Login() {
  const useStyles = makeStyles((theme) => ({
    paperStyle: {
      padding: "30px 20px",
      height: 370,
      width: 500,
      margin: "70px auto",
    },
    mobilePaperStyle: {
      padding: "30px 20px",
      height: 300,
      width: '90%',
      margin: "170px auto",
    },
    formStyle: {
      height: 220,
      display: "flex",
      flexFlow: "column wrap",
      justifyContent: "space-between",
    },
    mobileFormStyle: {
      height: 220,
      display: "flex",
      flexFlow: "column wrap",
      justifyContent: "space-between",
    },
    headerStyle: {
      margin: 0
    },
    avatarStyle: {
      backgroundColor: "#859DF4",
    },
    button: {
      backgroundColor: "#859DF4"
    },
    passwordStyle: {
      marginBottom: 30
    },
    invalid: { color: 'red'
    },
    load: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }
  }));


  const [email, setEmailState] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const classes = useStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const setEmail = (e) => {
    setInvalidCredentials(false)
    setEmailState(e.target.value)
  }

  const submit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post(`${BASE_URL}/Trait-Up-Backend/public/api/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        email,
        password,
      })  
      .then((response) => {
        
        setLoading(false);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        sessionStorage.setItem("token", response.data.token);
        !isMobile ? window.location.href = '/' : window.location.href = '/feed';
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 404) {
          setInvalidCredentials(true)
          setLoading(false)
        }
      });
  };

  if (loading) 
    return (
      <div className={classes.load}>
        <Loading/>
      </div>
    );

  return (
    <div>
      <Grid>
        <Paper elevation={20} className={!isMobile? classes.paperStyle : classes.mobilePaperStyle}>
          <Grid align="center">
            <Avatar className={classes.avatarStyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
            <h2 className={classes.headerStyle}>Log in</h2>
            {!invalidCredentials ? <Typography variant="caption" gutterBottom>
              Please fill this form to log in!
            </Typography> : <Typography className={classes.invalid} variant="caption" gutterBottom>
              Invalid credentials
            </Typography>}
          </Grid>
          <form onSubmit={submit} className={!isMobile? classes.formStyle : classes.mobileFormStyle}>
            <TextField
              error={invalidCredentials}
              fullWidth
              label="Email"
              placeholder="Enter your email"
              onChange={setEmail}
            />
            <TextField
              error={invalidCredentials}
              fullWidth
              className={classes.passwordStyle}
              label="Password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" className={classes.button}>
              Log in
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
}

export default Login;
