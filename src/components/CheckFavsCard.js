import React from 'react'
import Lottie from 'react-lottie';
import * as timer from '../assets/26792-progress-loader.json'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: timer.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const useStyles = makeStyles({
  root: {
    background: '#F6F6F6',
    maxWidth: 450,
    height: 170,
    marginTop: 50,
    marginLeft: 20,
    borderTop: '0.1px solid #DFEEFC',
  },
  title: {
    marginTop: 55,
    fontFamily: 'Fugaz One, cursive',
    width: 300
  },
  description: {
    fontFamily: 'Lato, sans-serif',
    fontSize: 15,
  },
  img: {
    maxWidth: 345,
  },
  joinBtn: {
    marginTop: 100,
  },
  box:{
    display: 'flex',
    flexFlow: 'row',
  }
});

function CheckFavsCard() {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <CardContent className={classes.box}>
          <Lottie options={defaultOptions} height={80} width={100}/>
          <Typography
            className={classes.title}
            align="center"
            gutterBottom
            variant="h5"
            component="h4"
          >
            View your favourites!
          </Typography>
          <Button
            color="primary"
            variant="contained"
            className={classes.joinBtn}
            component={Link}
            to="/register"
          >
            Let's see
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default CheckFavsCard;
