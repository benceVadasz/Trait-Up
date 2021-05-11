import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';

function Features() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      borderBottom: 'none',
    },
    paper: {
      padding: theme.spacing(10),
      margin: 'auto',
      width: '100%',
      minHeight: '100vh',
      borderBottom: 'none',
      borderTop: 'none',
      background: '#F6F6F6',
      display: 'flex',
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper className={classes.paper} width="15%">

      </Paper>
    </div>
  );
}


export default Features
