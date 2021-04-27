import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PublishIcon from "@material-ui/icons/Publish";

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
  }
}));

const ApplyModal = () => {

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const uploadClasses = useStyles();

  const handleOpen = () => {
    if (sessionStorage.getItem('token')) {
      setOpen(true);
    } else {
      alert('Please log in in order to apply for a job')
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Right. Let's get started</h2>
      <p id="simple-modal-description">
        Upload your CV
      </p>

      <div>
        <input accept="application/pdf" className={uploadClasses.input} id="contained-button-file" multiple type="file"/>
        <label htmlFor="contained-button-file">
          {/*<Button*/}
          {/*  variant="contained"*/}
          {/*  color="primary"*/}
          {/*  className={classes.button}*/}
          {/*  startIcon={<CloudUploadIcon />}*/}
          {/*>*/}
          {/*  Upload*/}
          {/*</Button>*/}
        </label>
      </div>

      <Button variant="contained"  color="primary" className={classes.margin}>
        Apply
      </Button>

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
