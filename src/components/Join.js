import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import join from "../assets/join.png";
import JoinNow from "./join_step_components/JoinNow";
import Assessment from "./join_step_components/Assessment";
import DreamJob from "./join_step_components/DreamJob";

function Join() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      display: "flex",
      flexFlow: "row",
      padding: theme.spacing(2),
      margin: "auto",
      width: "100%",
      minHeight: "100vh",
      background: "#FFFFFF",
      borderBottom: "none",
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
      width: 800,
      float: "right",
      marginTop: 20,
      marginLeft: 60,
    },
    joinBtn: {
      marginLeft: 150,
      marginTop: 330,
      backGround: "#5184CE",
    },
    color: {
      backGround: "#859DF4",
    },
    title: {
        marginBottom: 20,
        fontFamily: 'Fugaz One, cursive',
        fontSize: 40,
        width: 700,
        marginLeft: 120,
        marginTop: 115,
        color: "#859DF4",
        textShadow: '2px 1px black'
      },
    steps: {
      display: "flex",
      flexFlow: "column",
      marginTop: 12,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper className={classes.paper} width="15%">
        <Grid
          className={classes.steps}
          item
          xs
          container
          direction="column"
          spacing={2}
        >
          <JoinNow />
          <Assessment />
          <DreamJob />
        </Grid>
        <Grid container>
        <Grid item>
          <Typography
            className={classes.title}
            align="center"
            gutterBottom
            variant="h5"
            component="h3"
          >
            Let us help you get started
          </Typography>
        </Grid>
        <Grid item>
          <img className={classes.img} alt="complex" src={join} />
        </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Join;
