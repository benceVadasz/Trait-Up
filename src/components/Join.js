import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import join from "../assets/join.png";

function Join() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
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
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
      width: 800,
      marginRight: 150,
      marginTop: 80,
    },
    joinBtn: {
      marginLeft: 150,
      marginTop: 330,
      backGround: "#859DF4 !important",
    },
    color: {
        backGround: "#859DF4",
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper className={classes.paper} width="15%">
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
              <Button color="primary" variant="contained" className={classes.joinBtn} component={Link} to="/login">
              Join now!
            </Button>
              </Grid>
              <Grid item></Grid>
            </Grid>
            <Grid item>
              <img className={classes.img} alt="complex" src={join} />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Join;
