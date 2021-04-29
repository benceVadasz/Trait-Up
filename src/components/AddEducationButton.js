import React, {useState} from 'react';
import {Avatar, Button, Grid, Paper, TextField, Typography} from '@material-ui/core';
import 'fontsource-roboto';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';

const classes = {
  button: {
    // display: 'flex',
    width: "35%",
    fontSize: "15px",
    color: "white",
    alignItems: 'center'
  },
  root: {
    display: 'flex',
    // padding: '1em',
    width: 400,
    margin: '0 auto',
  },
  paper: {
    padding: "30px",
    width: "100px",
    alignItems: "center",
    position: "absolute",
    top: "50px",
  },
  modal: {
    width: 600,
    padding: "30px",
    top: "30%",
    left: "30%",
  },
  paperStyle: {
    padding: "30px 20px",
  },
  container: {
    display: "flex",
    flexFlow: 'column',
    alignItems: "center"
  },
  rightText: {
    marginLeft: 40,
  },
  flexGroup: {
    display: "flex",
    flexFlow: 'row',
    alignItems: "center",
    justifyContent: 'space-around'
  },
  formStyle: {
    height: 350,
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "space-between",
  },
  modalButton: {backgroundColor: "#859DF4"}
}


const ProfileEditDeleteButton = () => {

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalBody = (
    <Paper elevation={20} alignItems="center"
           justify="center" style={classes.paperStyle}>
      <Grid align="center">
        <Typography variant="caption" gutterBottom>
          Please fill this form to create an account !
        </Typography>
      </Grid>
      <form style={classes.root} noValidate autoComplete="off">
        <div style={classes.container}>
          <div style={classes.flexGroup}>
            <TextField label="School"/>
            <TextField style={classes.rightText} label="Faculty"/>
          </div>
          <div style={classes.flexGroup}>
            <TextField label="Degree"/>
            <TextField style={classes.rightText} label="Level"/>
          </div>
          <div style={classes.flexGroup}>
            <TextField label="From"/>
            <TextField style={classes.rightText} label="To"/>
          </div>
        </div>
      </form>
    </Paper>
  );

  return (
    <>
      <Grid style={classes.button} container orientation="column" spacing={1}>
        <Modal open={open} onClose={handleClose} style={classes.modal}
               aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">{modalBody}</Modal>
        <Grid item xs>
          <Button variant="contained"
                  color="primary"
                  size="small"
                  style={classes.button}
                  endIcon={<AddIcon/>}
                  onClick={handleOpen}>Add</Button>
        </Grid>
      </Grid>
    </>
  )
}

export default ProfileEditDeleteButton
