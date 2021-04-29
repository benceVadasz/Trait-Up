import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {BASE_URL} from "../constants";
import axios from 'axios';
import ModalBody from "./ModalBody";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import PublishIcon from "@material-ui/icons/Publish";
import {Grid} from "@material-ui/core";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  uploadButton: {
    position: "absolute",
    bottom: "30px",
    left: "30px",
    color: "white",
    padding: "5px 0",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),

  },
}));

const ApplyModal = (job) => {


  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);



  const handleOpen = () => {
    if (sessionStorage.getItem('token')) {
      setOpen(true);
    } else {
      alert('Please log in in order to apply for a job')
    }
  };

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          TraitUp
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const handleClose = () => {
    setOpen(false);
  };


  const applyForJob = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url:
        `${BASE_URL}/Trait-Up-Backend/public/api/applyForJob`,
      headers: {Authorization: "Bearer " + sessionStorage.getItem('token')},
      params: {
        jobId : job.jobId,
        title : job.title,
        type : job.type,
        location : job.location,
        company : job.company,
        created_at : job.created_at,
        company_logo : job.company_logo

      }

    }).then(() => {
      window.location.href = '/jobs';
    })

  }



  const body = (
    <div style={modalStyle} className={classes.paper}>

      <ModalBody applyForJob={applyForJob}></ModalBody>

      <Box mt={5}>
        <Copyright />
      </Box>

    </div>
  );

  return (
    <div>
      <Button variant="contained" color="primary" className={classes.margin} onClick={handleOpen}>
        Apply
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  )
}

export default ApplyModal;
