import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import assessmentImg from "../../assets/assessment.jpg";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "0 20px",
    height: 500,
  },
  title: {
    marginBottom: 20,
    fontFamily: 'Fugaz One, cursive'
  },
  description: { 
    fontFamily: 'Lato, sans-serif',
    fontSize: 15,
  },
  img: {
    maxWidth: 345, 

  }
});

export default function PersonalAssessmentFeature() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <img className={classes.img} alt="complex" src={assessmentImg} />
      <CardContent>
        <Typography
          className={classes.title}
          align="center"
          gutterBottom
          variant="h5"
          component="h3"
        >
          Personal assessments
        </Typography>
        <Typography className={classes.description} align="center" variant="body2" color="textSecondary" component="p">
          Take a quick but thorough questionnaire to find out exactly what kind of company culture suits you best
        </Typography>
      </CardContent>
    </Card>
  );
}
