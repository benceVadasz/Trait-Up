import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {Button, Typography, Paper, Grid, Avatar, Divider} from '@material-ui/core';
import 'fontsource-roboto';
import {UserContext} from '../context/UserContext';
import PersonIcon from '@material-ui/icons/Person';
import StarIcon from '@material-ui/icons/Star';
import DescriptionIcon from '@material-ui/icons/Description';
import AssessmentIcon from '@material-ui/icons/Assessment';

const classes = {
    paper: {
        padding: "30px", 
        margin: "20px", 
        alignItems: "center", 
        display: "flex", 
        flexFlow: "column"
    },
    button: {
        width: "100%",
        fontSize: "18px",
    },
    avatar: {
        width: "150px",
        height: "150px",
        margin: "5px",
    },
    link: {
        textDecoration: "none",
    }
}

const ProfileMenu = () => {

    const [user, setUser] = useContext(UserContext);

    return (
        <>
            <Paper elevation={3} style={classes.paper}>
                <Grid container spacing={2} direction="column">
                    <Grid item xs align="center">
                        <Avatar src={user.photo} alt="pic" variant="circular" style={classes.avatar} />
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h3" color="primary" align="center">Profile Menu</Typography>
                    </Grid>
                    <Grid item xs>
                        <Divider orientation="horizontal" style={{ margin: "5px 0 10px 0" }} />
                    </Grid>
                    <Grid item xs>
                        <Link to="/profile" style={classes.link}>
                            <Button variant="contained" color="primary" size="large" style={classes.button} startIcon={<PersonIcon fontSize="large" />}>Profile Info</Button>
                        </Link>
                    </Grid>
                    <Grid item xs>
                        <Link to="/profile/favorites" style={classes.link}>
                            <Button variant="contained" color="primary" size="large" style={classes.button} startIcon={<StarIcon fontSize="large" />}>Favorites</Button>
                        </Link>
                    </Grid>
                    <Grid item xs>
                        <Link to="/profile/applications" style={classes.link}>
                            <Button variant="contained" color="primary" size="large" style={classes.button} startIcon={<DescriptionIcon fontSize="large" />}>Applications</Button>
                        </Link>
                    </Grid>
                    <Grid item xs>
                        <Link to="/profile/assessments" style={classes.link}>
                            <Button variant="contained" color="primary" size="large" style={classes.button} startIcon={<AssessmentIcon fontSize="large" />}>Assessments</Button>
                        </Link>
                    </Grid>
                </Grid> 
            </Paper>
        </>
    )
}

export default ProfileMenu
