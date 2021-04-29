import React, {useState, useEffect} from 'react';
import {Typography, Paper, Grid} from '@material-ui/core';
import 'fontsource-roboto';
import ProfileEditDeleteButton from './ProfileEditDeleteButton';
import axios from "axios";
import {BASE_URL} from "../constants";
import AddEducationButton from "./AddEducationButton";

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

  const [userEdu, setUserEdu] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/Trait-Up-Backend/public/api/getUserEducation`,
        {headers: {Authorization: "Bearer " + token}}
      ).then((res) => {
      if (res.data) {
        setUserEdu(res.data)
      }
    })
      .catch(function (error) {
        console.log(error)
      });
  }, [userEdu])

  return (
    <>
      <Paper elevation={3} style={classes.paper}>
        <Grid container spacing={3} direction="column">
          <Grid style={classes.eduHeader} container item xs>
            <Typography style={classes.eduTitle} variant="h2" color="primary" align="center">Education</Typography>
            <AddEducationButton style={classes.eduButton}/>
          </Grid>


          <Grid item xs container justify="center">

            {userEdu.map((edu, i) => (
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
                      <ProfileEditDeleteButton fullEdu={edu} eduId={edu.id}/>
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
