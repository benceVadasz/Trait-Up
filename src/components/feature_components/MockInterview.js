import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InterviewImg from '../../assets/interview.png';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      margin: '0 30px',
      height: 500,
      paddingBottom: 30,
    },
    media: {
      height: 250,
    },
    title: {
        marginBottom: 20,  
        marginTop: 10,  
        fontFamily: 'Fugaz One, cursive'
      },
      description: { 
        fontFamily: 'Lato, sans-serif',
        fontSize: 15,
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
          <Typography className={classes.description} align="center" variant="body2" color="textSecondary" component="p">
            Prepare to ace your job interview by practicing on our multiple choice tech tests
          </Typography>
        </CardContent>
    </Card>
  );
}
