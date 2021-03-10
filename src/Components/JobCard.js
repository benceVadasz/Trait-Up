import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blue, blueGrey, grey, red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {JobsContext} from '../Contexts/JobsContext';
import React, {useContext} from 'react';
import DetailsIcon from '@material-ui/icons/Details';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 200,
  
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
      backgroundColor: blue[500],
    }

  }));

const JobCard = ({props, jobId}) => {

    const jobs = useContext(JobsContext);
    const classes = useStyles();
    const { history } = props;
;

  
    const {id, type, url, created_at, company, company_url, location, title, description, how_to_apply} = jobs[jobId];

    return (
        <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              TUp
            </Avatar>
          }
          action={
            <IconButton aria-label="detail" onClick = {() => history.push(`/jobs/${id}`)}> 
              <DetailsIcon />
            </IconButton>
          }
          title =  {`${title}`}
          subheader= {`${company}`}
        />
      
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
          Job type: {`${type}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Location: {`${location}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Created at: {`${created_at}`}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="apply">
            <AddCircleOutlineIcon/>
          </IconButton>
        </CardActions>
      </Card>
    )
}



export default JobCard;
