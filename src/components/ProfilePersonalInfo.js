import React, {useContext, useState, useEffect} from 'react';
import {TextField, Typography, Paper, Grid, Avatar, Divider, Button, IconButton} from '@material-ui/core';
import 'fontsource-roboto';
import {UserContext} from '../context/UserContext';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import PublishIcon from '@material-ui/icons/Publish';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));

const classes = {
    paper: {
        padding: "30px", 
        margin: "20px", 
        alignItems: "center", 
        display: "flex", 
        flexFlow: "column"
    },
    avatar: {
        margin: "10px", 
        width: "350px", 
        height: "400px",
    },
    avatarGrid: {
        position: "relative",
    },
    uploadButton: {
        position: "absolute",
        bottom: "30px",
        left: "30px",
        color: "white",
        padding: "5px 0"
    },

}

const ProfilePersonalInfo = () => {
    const uploadClasses = useStyles();

    const [user, setUser] = useContext(UserContext);

    const [editable, setEditable] = useState(false);
    const [userState, setUserState] = useState({});
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [address, setAddress] = useState(user.address);
    const [password, setPassword] = useState(user.password);

    useEffect(() => {
        setUserState({...user});
    }, [user])

    useEffect(() => {
        console.log("setting values for fields..")
        setName(userState.name);
        setEmail(userState.email);
        setPhone(userState.phone);
        setAddress(userState.address);
        setPassword(userState.password);
    }, [userState])

    const toggleEditable = (e) => {
        // setEditable(prevEditable => !prevEditable)
        if (editable) {
            setEditable(false);
            setUserState({...user});
            
        } else {
            setEditable(true);
        }
    }

    const saveInfo = (e) => {
        console.log("saving info...");
        setUser({...userState});
        toggleEditable();
    }

    const changeName = (e) => {
        setName(e.target.value, console.log(name));
        setUserState({...userState, name: e.target.value});
    }

    const changeEmail = (e) => {
        setEmail(e.target.value);
        setUserState({...userState, email: e.target.value});  
    }

    const changePhone = (e) => {
        setPhone(e.target.value);
        setUserState({...userState, phone: e.target.value});
        
    }

    const changeAddress = (e) => {
        setAddress(e.target.value);
        setUserState({...userState, address: e.target.value});
        
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
        setUserState({...userState, password: e.target.value});      
    }

    return (
        <>
            <Paper elevation={3} style={classes.paper}>
                <Grid container spacing={3} direction="column">
                    <Grid item xs container>
                        <Grid item xs={10}>
                            <Typography variant="h2" color="primary" align="center">Personal information</Typography> 
                        </Grid> 
                        <Grid item xs={2} >
                            <IconButton color="secondary" aria-label="save" size="medium" 
                                onClick={saveInfo} disabled={ !editable ? true : false }><SaveIcon fontSize="large"/></IconButton>
                            <IconButton color="primary" aria-label="edit" size="medium" 
                                onClick={toggleEditable} ><EditIcon fontSize="large"/></IconButton>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={3} direction="row">
                        <Grid item xs={5} style={classes.avatarGrid}>
                            <Avatar src={user.photo} alt="pic" variant="square" style={classes.avatar}/>
                            <div className={uploadClasses.root}>
                                <input accept="image/*" className={uploadClasses.input} id="contained-button-file" multiple type="file"/>
                                <label htmlFor="contained-button-file">
                                    <Button color="primary" variant="contained" size="small" style={classes.uploadButton} component="span"><PublishIcon fontSize="large"/></Button>
                                </label>
                            </div>
                        </Grid>
                        
                        <Grid item xs={7} container direction="row" spacing={2} align="center" style={{padding: "30px 5px"}}>
                            <Grid item xs={5} container spacing={2}>
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
                            
                            <Grid item xs={6} container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField disabled={ !editable ? true : false }
                                        variant="standard" value={name ? name : "enter name.."} align="left" 
                                        onChange={changeName} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField disabled={ !editable ? true : false } 
                                        variant="standard" value={email ? email : "enter email.."} align="left"
                                        onChange={changeEmail}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField disabled={ !editable ? true : false }
                                        variant="standard" value={phone ? phone : "enter phone number.."} align="left"
                                        onChange={changePhone}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField disabled={ !editable ? true : false } 
                                        variant="standard" value={address ? address : "enter address.."} align="left"
                                        onChange={changeAddress}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField disabled={ !editable ? true : false } type="password"
                                        variant="standard" value={password ? password : "enter password.."} align="left"
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
