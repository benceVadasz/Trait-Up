import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    root: {
      
      maxWidth: 450,
      height: 170,
      marginTop: 50,
      marginLeft: 20,
      borderTop: '0.1px solid gray',
    },
    title: {
      marginTop: 55,
      fontFamily: 'Fugaz One, cursive',
      width: 280
    },
    description: { 
      fontFamily: 'Lato, sans-serif',
      fontSize: 15,
    },
    img: {
      maxWidth: 345, 
    },
    joinBtn: {
        marginRight: 10,
        marginTop: 100,
    }, 
    box:{
        display: 'flex',
      flexFlow: 'row',
    }
  });

function Assessment() {
    const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <CardContent className={classes.box}>
        <Typography
          className={classes.title}
          align="center"
          gutterBottom
          variant="h5"
          component="h3"
        >
          Take our tests
        </Typography>
          <Button
                  color="primary"
                  variant="contained"
                  className={classes.joinBtn}
                  component={Link}
                  to="/assessments"
                >
                  Assessments
                </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Assessment;
