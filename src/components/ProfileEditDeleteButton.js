import React, {useEffect, useState} from 'react';
import {Button, Grid, Paper, TextField, Typography} from '@material-ui/core';
import 'fontsource-roboto';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';
import axios from "axios";
import {BASE_URL} from "../constants";
import favouriteModel from "../favouriteModel";
import Spinner from "react-spinner-material";

const classes = {
  button: {
    width: "100%",
    fontSize: "15px",
    color: "white",
  },
  paper: {
    padding: "30px",
    windth: "400px",
    alignItems: "center",
    position: "absolute",
    top: "50px",
  },
  root: {
    display: 'flex',
    width: 400,
    margin: '0 auto',
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
  modalButton: {
    backgroundColor: "#859DF4",
    marginTop: 20
  }
}


const ProfileEditDeleteButton = ({eduId, fullEdu}) => {
  const token = sessionStorage.getItem('token');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [school, setSchool] = useState("");
  const [faculty, setFaculty] = useState("");
  const [degree, setDegree] = useState("");
  const [level, setLevel] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const changeSchool = (e) => {
    setSchool(e.target.value);
  }

  const changeFaculty = (e) => {
    setFaculty(e.target.value);
  }

  const changeDegree = (e) => {
    setDegree(e.target.value);
  }

  const changeLevel = (e) => {
    setLevel(e.target.value);
  }

  const changeFrom = (e) => {
    setFrom(e.target.value);
  }

  const changeTo = (e) => {
    setTo(e.target.value);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    setLoading(true);
    axios({
      method: "post",
      url:
        `${BASE_URL}/Trait-Up-Backend/public/api/deleteStudy`,
      headers: {Authorization: "Bearer " + favouriteModel.token},
      params: {
        eduId
      }
    }).then((res) => {
      setLoading(false)
    })
      .catch(function (error) {
        alert('Something went wrong, while deleting education');
        return false;
      });
  };
  const update = (e) => {
    setLoading(true);
    e.preventDefault();
    axios({
      method: "post",
      url: `${BASE_URL}/Trait-Up-Backend/public/api/addEducation`,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },params: {school, degree, faculty, level, from, to}
    })
      .then((response) => {
        setOpen(false);
        setLoading(false);
      })
      .catch(function (error) {
        alert(error);
      });
  };

  useEffect(() => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);


  const modalBody = (
    (fullEdu) ?
  <Paper elevation={20} alignItems="center"
         justify="center" style={classes.paperStyle}>
    <Grid align="center">
      <Typography variant="caption" gutterBottom>
        Please enter details about your education!
      </Typography>
    </Grid>
    <form style={classes.root} onSubmit={update} noValidate autoComplete="off">
      <div style={classes.container}>
        <div style={classes.flexGroup}>
          <TextField defaultValue={fullEdu.school} onChange={changeSchool} label="School"/>
          <TextField defaultValue={fullEdu.type} onChange={changeFaculty} style={classes.rightText} label="Faculty"/>
        </div>
        <div style={classes.flexGroup}>
          <TextField defaultValue={fullEdu.degree} onChange={changeDegree} label="Degree"/>
          <TextField defaultValue={fullEdu.level} onChange={changeLevel} style={classes.rightText} label="Level"/>
        </div>
        <div style={classes.flexGroup}>
          <TextField defaultValue={fullEdu.from} onChange={changeFrom} label="From"/>
          <TextField defaultValue={fullEdu.to} onChange={changeTo} style={classes.rightText} label="To"/>
        </div>
        <Button type="submit" variant="contained" style={classes.modalButton}>
          Save
        </Button>
      </div>
    </form>
  </Paper> : null
  );

  if (loading)
    return (
      <div className={classes.load}>
        <Spinner
          size={120}
          spinnerColor={"red"}
          spinnerWidth={2}
          visible={true}
        />
      </div>
    );

  return (
    <>
      <Grid container orientation="column" spacing={1}>
        <Grid item xs>
          <Button variant="contained"
                  color="primary"
                  size="small"
                  style={classes.button}
                  endIcon={<EditIcon/>}
                  onClick={handleOpen}>Edit</Button>
          <Modal open={open} onClose={handleClose} style={classes.modal}
                 aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">{modalBody}</Modal>
        </Grid>
        <Grid item xs>
          <Button variant="contained"
                  color="secondary"
                  size="small"
                  style={classes.button}
                  endIcon={<DeleteIcon/>}
                  onClick={handleDelete}>Delete</Button>
        </Grid>
      </Grid>
    </>
  )
}

export default ProfileEditDeleteButton
