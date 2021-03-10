import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import logo from "../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#F6F6F6",
    flexGrow: 1,
    marginBottom: "5px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navbarStyle: {
    background: "#859DF4",
  },
  img: {
    width: 150,  
    marginTop: 5,
  }
}));

export default function MenuAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.navbarStyle} position="static">
        <Toolbar>
          <img className={classes.img} alt="complex" src={logo} />
          <Typography variant="h6" className={classes.title}></Typography>
          <div>
            <Button component={Link} to="/jobs" color="inherit">
              Jobs
            </Button>
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
            <Button component={Link} to="/register" color="inherit">
              Register
            </Button>
            <IconButton
              component={Link}
              to="/profile"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
