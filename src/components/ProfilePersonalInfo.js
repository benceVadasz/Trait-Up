import React, {useState, useEffect} from 'react';
import {TextField, Typography, Paper, Grid, Avatar, Divider, Button, IconButton} from '@material-ui/core';
import 'fontsource-roboto';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import PublishIcon from '@material-ui/icons/Publish';
import {makeStyles} from '@material-ui/core/styles';
import axios from "axios";
import {BASE_URL} from "../constants";
import favouriteModel from "../favouriteModel";
import {useTheme} from '@material-ui/core/styles';
import {useMediaQuery} from '@material-ui/core';
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    height: '100vh'
  },
  paper: {
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
  mobilePaper: {
    width: '100%',
    height: '100vh',
  },
  fields: {
    marginLeft: 20,
  },
  button: {
    marginTop: 50,
    marginLeft: 50,
  },
  input: {
    width: 200
  }
}));


const ProfilePersonalInfo = () => {
  const classes = useStyles();
  // const [user, setUser] = useContext(UserContext);

  const [editable, setEditable] = useState(false);
  const [userState, setUserState] = useState({});
  const [name, setName] = useState(userState.name);
  const [email, setEmail] = useState(userState.email);
  const [phone_number, setPhone] = useState(userState.phone_number);
  const [address, setAddress] = useState(userState.address);
  const [birth_date, setBirthday] = useState("");
  const token = sessionStorage.getItem("token");
  const theme2 = useTheme();
  const isMobile = useMediaQuery(theme2.breakpoints.down('sm'));

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/Trait-Up-Backend/public/api/getUser`,
        {headers: {Authorization: "Bearer " + token}}
      ).then((res) => {
      setUserState(res.data)
    })
      .catch(function (error) {
        alert('Could not load user data');
      });
  }, [])


  useEffect(() => {
    console.log(userState);
    setName(userState.name);
    setEmail(userState.email);
    setPhone(userState.phone_number);
    setAddress(userState.address);
    setBirthday(userState.birth_date);
  }, [userState])

  const toggleEditable = (e) => {
    // setEditable(prevEditable => !prevEditable)
    if (editable) {
      setEditable(false);
      setUserState({...userState});

    } else {
      setEditable(true);
    }
  }

  const saveInfo = (e) => {
    setUserState({...userState});
    updateInfo();
    toggleEditable();
  }

  const updateInfo = () => {
    console.log(userState)
    axios({
      method: "put",
      url:
        `${BASE_URL}/Trait-Up-Backend/public/api/updateUserInfo`,
      headers: {Authorization: "Bearer " + favouriteModel.token},
      params: {
        userState
      }
    }).then((res) => {
      console.log(res.data)
    })
      .catch(function (error) {
        alert('Could not update info');
        return false;
      });
  }

  const logout = () => {
    sessionStorage.clear();
    window.location.href = '/';
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
    setUserState({...userState, phone_number: e.target.value});
  }

  const changeAddress = (e) => {
    setAddress(e.target.value);
    setUserState({...userState, address: e.target.value});
  }

  const changeBirthday = (e) => {
    setBirthday(e.target.value);
    setUserState({...userState, birth_date: e.target.value});
  }

  return (
    <>
      <Paper elevation={3} className={!isMobile ? classes.paper : classes.mobilePaper}>
        <Grid container spacing={3} direction="column">
          <Grid item xs container>
            <Grid item xs={10}>
              <Typography variant="h2" color="primary" align="center">Personal information</Typography>
            </Grid>
            <Grid item xs={2}>
              <IconButton color="secondary" aria-label="save" size="medium"
                          onClick={saveInfo} disabled={!editable}><SaveIcon
                fontSize="large"/></IconButton>
              <IconButton color="primary" aria-label="edit" size="medium"
                          onClick={toggleEditable}><EditIcon fontSize="large"/></IconButton>
            </Grid>
          </Grid>
          <Grid item container spacing={3} direction="row">
            {!isMobile ? <Grid item xs={5} className={classes.avatarGrid}>
              <Avatar src={userState.photo} alt="pic" variant="square" className={classes.avatar}/>
              <div className={classes.root}>
                <input accept="image/*" className={classes.input} id="contained-button-file" multiple
                       type="file"/>
                <label htmlFor="contained-button-file">
                  <Button color="primary" variant="contained" size="small" className={classes.uploadButton}
                          component="span"><PublishIcon fontSize="large"/></Button>
                </label>
              </div>
            </Grid> : null}

            <Grid item xs={7} container direction="row" spacing={2} align="center" className={{width: '80%', padding: "30px 5px", marginTop: 90}}>
              <Grid item xs={5} className={isMobile ? classes.fields : ''} container spacing={2}>
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
                  <Typography variant="h4" color="primary" align="right">Birthday:</Typography>
                </Grid>
              </Grid>

              <Grid item xs={1} align="center">
                <Divider orientation="vertical"/>
              </Grid>

              <Grid item xs={6} container spacing={2}>
                <Grid className={isMobile? classes.input : ''} item xs={12}>
                  <TextField disabled={!editable}
                             variant="standard" value={name ? name : "enter name.."} align="left"
                             onChange={changeName}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField disabled={!editable}
                             variant="standard" value={email ? email : "enter email.."} align="left"
                             onChange={changeEmail}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField disabled={!editable}
                             variant="standard" value={phone_number ? phone_number : "enter phone_number number.."}
                             align="left"
                             onChange={changePhone}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField disabled={!editable}
                             variant="standard" value={address ? address : "enter address.."} align="left"
                             onChange={changeAddress}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="date"
                    label="Birthday"
                    type="date"
                    disabled={!editable}
                    onChange={changeBirthday}
                    value={birth_date ? birth_date : "add your birth_date.."}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                </Grid>
              </Grid>

            </Grid>

          </Grid>
        </Grid>
        {isMobile ?
          <div className={classes.button}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              endIcon={<ClearIcon/>}
              onClick={logout}>
              Logout
            </Button>
          </div> : <></>
        }
      </Paper>
    </>
  )
}

export default ProfilePersonalInfo;
