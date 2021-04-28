import React, {useState} from 'react';
import {Avatar, Button, Grid, Paper, TextField, Typography} from '@material-ui/core';
import 'fontsource-roboto';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

const classes = {
  button: {
    display: 'flex',
    width: "35%",
    fontSize: "15px",
    color: "white",
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
    <Paper elevation={20} style={classes.paperStyle}>
      <Grid align="center">
        <Typography variant="caption" gutterBottom>
          Please fill this form to create an account !
        </Typography>
      </Grid>
      <form style={classes.formStyle}>
        <TextField
          // onChange={(e) => setName(e.target.value)}
          fullWidth
          label="Name"
          placeholder="Enter your name"
        />
        <TextField
          // onChange={(e) => setEmail(e.target.value)}
          fullWidth
          label="Email"
          placeholder="Enter your email"
        />
        <TextField
          // onChange={(e) => setPassword(e.target.value)}
          fullWidth
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
        <TextField
          // onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
        />
        <Button type="submit" variant="contained" style={classes.modalButton}>
          Sign up
        </Button>
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
