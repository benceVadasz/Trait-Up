import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import welcomeImg from "../assets/welcome.png";

function Welcome() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      width: "100%",
      minHeight: "90vh",
      background: "#FFFFFF",
      borderBottom: "none",
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      marginTop: "90px",
      display: "block",
      marginRight: "100px",
      width: 800,
    },
    welcomeBlock: {
      marginTop: "190px",
      marginLeft: "80px",
    },
    trait: {
      color: "#859DF4",
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper className={classes.paper} width="15%">
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid className={classes.welcomeBlock} item xs spacing={3}>
                <Typography gutterBottom variant="h3">
                  Welcome to <span className={classes.trait}>Trait up!</span>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Your ultimate job hunt tool to find a job
                </Typography>
                <Typography variant="body2">
                  tailored perfectly to your unique personality archetype
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  style={{ cursor: "pointer" }}
                ></Typography>
              </Grid>
            </Grid>
            <img className={classes.img} alt="complex" src={welcomeImg} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Welcome;
