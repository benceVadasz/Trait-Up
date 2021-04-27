import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const useStyles = makeStyles((theme) => ({

  margin: {
    margin: theme.spacing(1),
  }

}));

const ApplyModal = () => {

  const classes = useStyles();


  return (
    <Button variant="outlined" size="small" color="primary" className={classes.margin}>
      Apply
    </Button>
  )
}

export default ApplyModal;
