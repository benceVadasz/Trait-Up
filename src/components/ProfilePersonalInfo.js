import React, {useContext, useState, useEffect} from 'react';
import {TextField, Typography, Paper, Grid, Avatar, Divider, Button, IconButton} from '@material-ui/core';
import 'fontsource-roboto';
import {UserContext} from '../context/UserContext';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

const classes = {
    paper: {
        padding: "30px", 
        margin: "20px", 
        alignItems: "center", 
        display: "flex", 
        flexFlow: "column"
    },
    editButton: {
        borderRadius: "200px",
    }
}

const ProfilePersonalInfo = () => {

    const [user, setUser] = useContext(UserContext);

    const [editable, setEditable] = useState(false);
    const [userState, setUserState] = useState({});

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setUserState(user);
    }, [])

    const toggleEditable = (e) => {
        if (editable) {
            setEditable(false);
        } else {
            setEditable(true);
        }
    }

    const saveInfo = (e) => {
        console.log("saving info...");
        console.log(e.target);
        console.log(userState);
        // setUser({...user, })
        
        toggleEditable();
    }

    const changeName = (e) => {
        setUserState({...userState, name: e.target.value}, console.log(userState));
        setName(e.target.value);
    }

    const changeEmail = (e) => {
        setUserState({...userState, email: e.target.value}, console.log(userState));
        setEmail(e.target.value);
    }

    const changePhone = (e) => {
        setUserState({...userState, phone: e.target.value}, console.log(userState));
        setPhone(e.target.value);
    }

    const changeAddress = (e) => {
        setUserState({...userState, address: e.target.value}, console.log(userState));
        setAddress(e.target.value);
    }

    const changePassword = (e) => {
        setUserState({...userState, password: e.target.value}, console.log(userState));
        setPassword(e.target.value);
    }

    return (
        <>
            <Paper elevation={3} style={classes.paper}>
                <Grid container spacing={3} direction="column">
                    <Grid item xs container>
                        <Grid item xs={10}>
                            <Typography variant="h2" color="primary" align="center">Personal information</Typography> 
                        </Grid> 
                        <Grid item xs={2}>
                            <IconButton variant="contained" color="secondary" aria-label="save" size="medium" 
                                onClick={saveInfo} disabled={ !editable ? true : false }><SaveIcon fontSize="large"/></IconButton>
                            <IconButton variant="contained" color="primary" aria-label="edit" size="medium" 
                                onClick={toggleEditable} ><EditIcon fontSize="large"/></IconButton>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={3} direction="row">
                        <Grid item xs={4}>
                            <Avatar src={user.photo} alt="pic" variant="square" style={{margin: "10px", width: "350px", height: "400px"}}/>
                        </Grid>
                        
                        <Grid item xs={8} container direction="row" spacing={2} align="center" style={{padding: "20px"}}>
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
                                    <TextField disabled={ !editable ? true : false }
                                        variant="standard" defaultValue={userState.name ? userState.name : user.name} align="left" 
                                        onChange={changeName} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField disabled={ !editable ? true : false } 
                                        variant="standard" defaultValue={user.email} align="left"
                                        onChange={changeEmail}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField disabled={ !editable ? true : false }
                                        variant="standard" defaultValue={user.phone} align="left"
                                        onChange={changePhone}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField disabled={ !editable ? true : false } 
                                        variant="standard" defaultValue={user.address} align="left"
                                        onChange={changeAddress}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField disabled={ !editable ? true : false } 
                                        variant="standard" defaultValue={user.password} type="password" align="left"
                                        onChange={changePassword}/>
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
