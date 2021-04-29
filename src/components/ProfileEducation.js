import React, {useContext, useEffect} from 'react';
import {Typography, Paper, Grid} from '@material-ui/core';
import 'fontsource-roboto';
import {UserContext} from '../contexts/UserContext';
import ProfileEditDeleteButton from './ProfileEditDeleteButton';
import useState from "react-hook-use-state";
import axios from "axios";
import {BASE_URL} from "../constants";
import AddEducationButton from "./AddEducationButton";
import userModel from "../userModel";

const classes = {
  paper: {
    padding: "30px",
    margin: "20px",
    alignItems: "center",
    display: "flex",
    flexFlow: "column"
  },
  paperEdu: {
    padding: "20px",
    margin: "15px",
    background: "#eceef7",
  },
  eduText: {
    marginBottom: "5px",
    fontWeight: "bold",
  },
  eduTitle: {
    position: "absolute",
    fontWeight: "bold",
    right: '50%',
    transform: 'translate(50%,-50%)'
  },
  eduButton: {
    position: "absolute",
    width: 420,
  },
  eduHeader: {
    position: "relative",
  }
}


const ProfileEducation = () => {

  const [user, setUser] = useState({});
  const token = sessionStorage.getItem("token");
  const [usert] = useContext(UserContext);


  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/Trait-Up-Backend/public/api/getUserEducation`,
        {headers: {Authorization: "Bearer " + token}}
      ).then((res) => {
      setUser(res.data)
    })
      .catch(function (error) {
        alert('Could not load user data');
      });
  }, [])

  if (user) {
    console.log(user)
  }

  return (
    <>
      <Paper elevation={3} style={classes.paper}>
        <Grid container spacing={3} direction="column">
          <Grid style={classes.eduHeader} container item xs>
            <Typography style={classes.eduTitle} variant="h2" color="primary" align="center">Education</Typography>
            <AddEducationButton style={classes.eduButton}/>
          </Grid>



          <Grid item xs container justify="center">
            {user.map((edu, i) => (
              <Grid item xs={10} key={i}>
                <Paper elevation={2} style={classes.paperEdu}>
                  <Grid container alignItems="center">
                    <Grid item xs={10}>
                      <Typography variant="h4" color="primary" style={classes.eduText}>{edu.school}</Typography>
                      <Typography variant="body1" color="primary"
                                  style={classes.eduText}>{edu.degree} {edu.level}</Typography>
                      <Typography variant="body2" color="primary"
                                  style={classes.eduText}>{edu.from} - {edu.to}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <ProfileEditDeleteButton/>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default ProfileEducation
