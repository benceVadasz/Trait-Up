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
        <Typography align="center" variant="body2" color="textSecondary" component="p">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </Card>
  );
}
