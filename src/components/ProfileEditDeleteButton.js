import React, {useState} from 'react';
import {Button, Grid, Paper } from '@material-ui/core';
import 'fontsource-roboto';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';

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


const ProfileEditDeleteButton = () => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
    setOpen(false);
    };

    const modalBody = (
        <Paper elevation={3} className={classes.paper}>
          <h2 >Edit modal</h2>
          <p>Modal for testing.</p>
        </Paper>
    );

    return (
        <>
            <Grid container orientation="column" spacing={1}>
                <Grid item xs>
                    <Button variant="contained" 
                        color="primary" 
                        size="small" 
                        style={classes.button} 
                        endIcon={<EditIcon />}
                        onClick={handleOpen}>Edit</Button>
                    <Modal open={open} onClose={handleClose} style={classes.modal}
                        aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">{modalBody}</Modal>
                </Grid>
                <Grid item xs>
                    <Button variant="contained" 
                        color="secondary" 
                        size="small" 
                        style={classes.button} 
                        endIcon={<DeleteIcon />}
                        onClick={handleOpen}>Delete</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default ProfileEditDeleteButton
