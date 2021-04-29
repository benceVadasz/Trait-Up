import React, {useEffect, useState} from 'react';
import {Button, Grid, Paper} from '@material-ui/core';
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
  modal: {
    width: 600,
    padding: "30px",
    border: "none",
    position: "fixed",
    top: "300px",
    left: "600px",
  }
}


const ProfileEditDeleteButton = ({eduId}) => {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);


  const modalBody = (
    <Paper elevation={3} className={classes.paper}>
      <h2>Edit modal</h2>
      <p>Modal for testing.</p>
    </Paper>
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
