import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import SearchIcon from '@material-ui/icons/Search';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    width: '100%',
    top: 'auto',
    bottom: 0,
    background: '#E3E3E3',
    boxShadow: '10px 0 0 0 black',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  iconButton: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',

  },
  icon: {
    marginBottom: -10,

  },
  buttonLabel: {
    marginBottom: 6,
    color: '#212121'
  }
}));

export default function BottomAppBar() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline/>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Button className="paper-button" component={Link} to="/jobs">
            <div className={classes.iconButton}>
              <IconButton className={classes.icon}>
                <SearchIcon/>
              </IconButton>
              <Typography className={classes.buttonLabel} variant="body2">
                Jobs
              </Typography>
            </div>
          </Button>
          <Button className="paper-button" component={Link} to="/profiles/favourites" color="inherit">
            <div className={classes.iconButton}>
              <IconButton className={classes.icon}>
                <StarBorderIcon/>
              </IconButton>
              <Typography className={classes.buttonLabel} variant="body2">
                Favourites
              </Typography>
            </div>
          </Button>
          <Button className="paper-button" component={Link} to="/profiles/applications" color="inherit">
            <div className={classes.iconButton}>
              <IconButton className={classes.icon}>
                <DescriptionOutlinedIcon/>
              </IconButton>
              <Typography className={classes.buttonLabel} variant="body2">
                Applications
              </Typography>
            </div>
          </Button>
          <Button className="paper-button" component={Link} to="/profile" color="inherit">
            <div className={classes.iconButton}>
              <IconButton className={classes.icon}>
                <PersonOutlineOutlinedIcon/>
              </IconButton>
              <Typography className={classes.buttonLabel} variant="body2">
                Profile
              </Typography>
            </div>
          </Button>

        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
