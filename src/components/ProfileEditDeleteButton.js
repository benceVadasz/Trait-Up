import React from 'react';
import {Button, Grid } from '@material-ui/core';
import 'fontsource-roboto';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const classes = {
    button: {
        width: "100%",
        fontSize: "15px",
    }
}


const ProfileEditDeleteButton = () => {
    return (
        <>
            <Grid container orientation="column" spacing={1}>
                <Grid item xs>
                    <Button variant="contained" 
                        color="primary" 
                        size="small" 
                        style={classes.button} 
                        endIcon={<EditIcon />}>Edit</Button>
                </Grid>
                <Grid item xs>
                    <Button variant="contained" 
                        color="secondary" 
                        size="small" 
                        style={classes.button} 
                        endIcon={<DeleteIcon />}>Delete</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default ProfileEditDeleteButton
