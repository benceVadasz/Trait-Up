import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
  root: {
    background: '#859DF4',
    width: '100%',
    height: '100vh',
    flexGrow: 1,
    marginBottom: '5px',
    position: 'relative'
  },
  welcomeWord: {
    fontFamily: 'Fugaz One, cursive',
    position: 'absolute',
    top: '30%',
    left: '7%',
  },
  trait: {
    color: "#FFF",
  },
  welcomeText: {
    position: 'absolute',
    fontFamily: 'Lato, sans-serif',
    fontSize: 16,
    top: '47%',
    left: '7%',
  },
  haveAccount: {
    position: 'absolute',
    fontFamily: 'Lato, sans-serif',
    fontSize: 16,
    top: '75%',
    left: '7%',
  },
  joinBtn: {
    position: 'absolute',
    fontFamily: 'Fugaz One, cursive',
    top: '59%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  singIn: {
    position: 'absolute',
    fontFamily: 'Fugaz One, cursive',
    top: '83%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }
}));

export default function LandingPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.welcomeWord} gutterBottom variant="h3">
        Welcome to <span className={classes.trait}>Trait up!</span>
      </Typography>
      <Typography className={classes.welcomeText} variant="body2" gutterBottom>
        Your ultimate job hunt tool to find a job tailored perfectly to your unique personality archetype
      </Typography>
      <Button
        color="primary"
        variant="contained"
        className={classes.joinBtn}
        component={Link}
        to="/register"
      >
        Sign up
      </Button>
      <Typography className={classes.haveAccount} variant="body2" gutterBottom>
        Already have an account?
      </Typography>
      <Button
        color="primary"
        variant="contained"
        className={classes.singIn}
        component={Link}
        to="/login"
      >
        Sign in
      </Button>
    </div>
  );
}
