import React, {useState} from 'react';
import {Avatar, Button, Grid, Paper, TextField, Typography} from '@material-ui/core';
import 'fontsource-roboto';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import axios from "axios";
import {BASE_URL} from "../constants";

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
    height: 600,
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
    height: 550,
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "space-between",
  },
  modalButton: {
    backgroundColor: "#859DF4",
    marginTop: 20
  }
}


const ProfileEditDeleteButton = () => {

  const [open, setOpen] = useState(false);
  const [school, setSchool] = useState("");
  const [faculty, setFaculty] = useState("");
  const [degree, setDegree] = useState("");
  const [level, setLevel] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const changeSchool = (e) => {
    setSchool(e.target.value);
    // setUserState({...userState, name: e.target.value});
  }

  const changeFaculty = (e) => {
    setFaculty(e.target.value);
    // setUserState({...userState, email: e.target.value});
  }

  const changeDegree = (e) => {
    setDegree(e.target.value);
    // setUserState({...userState, 'phone number': e.target.value});
  }

  const changeLevel = (e) => {
    setLevel(e.target.value);
    // setUserState({...userState, address: e.target.value});
  }

  const changeFrom = (e) => {
    setFrom(e.target.value);
    // setUserState({...userState, birthday: e.target.value});
  }

  const changeTo = (e) => {
    setTo(e.target.value);
    // setUserState({...userState, birthday: e.target.value});
  }

  const submit = (e) => {
    // setLoading(true);
    e.preventDefault();
    axios
      .post(`${BASE_URL}/Trait-Up-Backend/public/api/addEducation`, {
        headers: {
          "Content-Type": "application/json",
        }, school, degree, faculty, level, from, to
      })
      .then((response) => {
        // setLoading(false);
      })
      .catch(function (error) {
        alert(error);
      });
  };

  const modalBody = (
    <Paper elevation={20} alignItems="center"
           justify="center" style={classes.paperStyle}>
      <Grid align="center">
        <Typography variant="caption" gutterBottom>
          Please enter details about your education!
        </Typography>
      </Grid>
      <form style={classes.root} onSubmit={submit} noValidate autoComplete="off">
        <div style={classes.container}>
          <div style={classes.flexGroup}>
            <TextField onChange={changeSchool} label="School"/>
            <TextField onChange={changeFaculty} style={classes.rightText} label="Faculty"/>
          </div>
          <div style={classes.flexGroup}>
            <TextField onChange={changeDegree} label="Degree"/>
            <TextField onChange={changeLevel} style={classes.rightText} label="Level"/>
          </div>
          <div style={classes.flexGroup}>
            <TextField onChange={changeFrom} label="From"/>
            <TextField onChange={changeTo} style={classes.rightText} label="To"/>
          </div>
          <Button type="submit" variant="contained" style={classes.modalButton}>
            Add
          </Button>
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
