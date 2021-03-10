import React, {useContext} from 'react';
import {TextField, Typography, Paper, Grid, Avatar, Divider} from '@material-ui/core';
import 'fontsource-roboto';
import {UserContext} from '../context/UserContext';

const classes = {
    paper: {
        padding: "30px", 
        margin: "20px", 
        alignItems: "center", 
        display: "flex", 
        flexFlow: "column"
    }
}

const ProfilePersonalInfo = () => {

    const [user, setUser] = useContext(UserContext);

    return (
        <>
            <Paper elevation={3} style={classes.paper}>
                <Grid container spacing={3} direction="column">
                    <Grid item>
                        <Typography variant="h2" color="primary" align="center">Personal information</Typography>  
                    </Grid>
                    <Grid item container spacing={3} direction="row">
                        <Grid item xs={4}>
                            <Avatar src={user.photo} alt="pic" variant="square" style={{margin: "10px", width: "350px", height: "400px"}}/>
                        </Grid>
                        
                        <Grid item xs={8} container direction="row" spacing={2} align="center" style={{padding: "30px"}}>
                            <Grid item xs={6} container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" color="primary" align="right">Name:</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h4" color="primary" align="right">Email:</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h4" color="primary" align="right">Phone:</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h4" color="primary" align="right">Address:</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h4" color="primary" align="right">Password:</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={1} align="center">
                                <Divider orientation="vertical" />
                            </Grid>
                            <Grid item xs={5} container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField disabled variant="standard" value={user.name} align="left" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField disabled variant="standard" value={user.email} align="left"/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField disabled variant="standard" value={user.phone} align="left"/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField disabled variant="standard" value={user.address} align="left"/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField disabled variant="standard" value={user.password} type="password" align="left"/>
                                </Grid>
                            </Grid>
                            
                        </Grid>

                    </Grid>
                </Grid> 
            </Paper>
        </>
    )
}

export default ProfilePersonalInfo
