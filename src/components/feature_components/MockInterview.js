import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InterviewImg from '../../assets/interview.png';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      margin: '0 20px',
      height: 500,
  
    },
    media: {
      height: 250,
    },
    title: {
        marginBottom: 20,  
      },
      img: {
        width: 365  
      },
  });
export default function MockInterview() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
        <img className={classes.img} alt="complex" src={InterviewImg} />
        <CardContent>
          <Typography className={classes.title} align="center" gutterBottom variant="h5" component="h3">
            Mock Interviews
          </Typography>
          <Typography align="center" variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
    </Card>
  );
}
