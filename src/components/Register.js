import React, { useState } from "react";
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

function Register() {
  const useStyles = makeStyles((theme) => ({
    paperStyle: {
      padding: "30px 20px",
      height: 490,
      width: 500,
      margin: "70px auto",
    },
    mobilePaperStyle: {
      padding: "30px 20px 10px 20px",
      height: 450,
      width: '90%',
      margin: "140px auto",
    },
    formStyle: {
      height: 350,
      display: "flex",
      flexFlow: "column wrap",
      justifyContent: "space-between",
    },
    mobileFormStyle: {
      padding: "30px 20px",
      display: "flex",
      flexFlow: "column wrap",
      justifyContent: "space-between",
    },
    headerStyle: {
      margin: 0
    },
    invalid: {
      color: 'red'
    },
    avatarStyle: {
      backgroundColor: "#859DF4",
      marginBottom: 10
    },
    button: {
      backgroundColor: "#859DF4"
    },
    mobileButton: {
      backgroundColor: "#859DF4", marginTop: 30
    },
    load: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }
  }));
  const classes = useStyles();
  const [name, setNameState] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [cPasswordError, setCPasswordError] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (name === '') setNameError(true);
    if (email === '') setEmailError(true);
    if (password === '') setPasswordError(true);
    if (confirmPassword === '') {
      setCPasswordError(true)
      return
    }
    if (password !== confirmPassword) alert("Passwords do not match");
    setLoading(true);
    axios
      .post(`${BASE_URL}/Trait-Up-Backend/public/api/registration`, {
        headers: {
          "Content-Type": "application/json",
        },
        name,
        email,
        password,
      })
      .then((response) => {
        setLoading(false);
        window.location.href = "/";
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setInvalidEmail(true)
          setLoading(false)
        }
      });
  };

  const setName = (e) => {
    setNameState(e.target.value)
    setInvalidEmail(false)
    setEmailError(false)
    setNameError(false)
    setPasswordError(false)
    setCPasswordError(false)
  }

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
            <Avatar classname={classes.avatarStyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
            <h2 className={classes.headerStyle}>Trait Up</h2>
            {!invalidEmail? <Typography variant="caption" gutterBottom>
              Please fill this form to create an account !
            </Typography> : !emailError ? <Typography className={classes.invalid} variant="caption" gutterBottom>
              Email is invalid
              </Typography> : ""}
          </Grid>
          <form className={!isMobile? classes.formStyle : classes.mobileFormStyle} onSubmit={submit}>
            <TextField
              onChange={setName}
              fullWidth
              label="Name"
              placeholder="Enter your name"
              error={nameError}
              helperText={nameError? 'Name is required': ""}
            />
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              error={invalidEmail || emailError}
              label="Email"
              placeholder={"Enter your email"}
              helperText={emailError? "Email is required" : ""}
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              label="Password"
              error={passwordError}
              helperText={passwordError ?"password is required": ""}
              type="password"
              placeholder="Enter your password"
            />
            <TextField
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              error={cPasswordError}
              helperText={cPasswordError ?"confirm password is required": ""}
            />
            <Button type="submit" variant="contained" className={!isMobile? classes.button : classes.mobileButton}>
              Sign up
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
}

export default Register;
