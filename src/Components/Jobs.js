import React, {useContext} from 'react';
import {JobsContext} from '../Contexts/JobsContext';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

const Jobs = () => {

    const jobs = useContext(JobsContext);
    console.log(jobs)
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const createJobCard = (jobsId) => {
      const {id, type, url, created_at, company, company_url, location, title, description, how_to_apply} = jobs[jobsId];

      return (
        <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              TUp
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title =  {`${title}`}
          subheader= {`${created_at}`}
        />
        <Typography>Company: {`${company}`} </Typography>
        {/* <CardMedia
          className={classes.media}
          image={`${company_url}`}
          title="Paella dish"
        /> */}
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
          Job type: {`${type}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Location: {`${location}`}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              How to apply:
            </Typography>
            <Typography paragraph>
            {`${how_to_apply}`}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
    }


    return (
      <Card container spacing={2}>
      {Object.keys(jobs).map(jobsId => 
          createJobCard(jobsId))}
      </Card>
    );
    
}

export default Jobs;
