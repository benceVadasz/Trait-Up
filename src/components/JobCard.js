import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blue, blueGrey } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {JobsContext} from '../Contexts/JobsContext';
import React, {useContext} from 'react';
import DetailsIcon from '@material-ui/icons/Details';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {JobContext} from '../Contexts/JobDetailContext';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 200,
  
    },
    media: {

      paddingTop: '30%', // 16:9
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
      backgroundColor: "#859DF4",
    },
    margin: {
      margin: theme.spacing(1),
    },

  }));

const JobCard = ({props, jobId}) => {

    const jobs = useContext(JobsContext);
    const classes = useStyles();
    const { history } = props;
    const [job, setJob]  = useContext(JobContext);  

    const {id, type, created_at, company,  location, title, description, company_logo} = jobs[jobId];
    const currentJob = jobs[jobId]

    const saveJob = (currentJob) => {
      // const Job = { id: id, type: type, created_at: created_at, company: company, location: location, title: title, description: description};
      setJob([...job, currentJob]);
      history.push(`/jobs/${id}`)
    }

    return (
        <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              TUp
            </Avatar>
          }
          action={
            <IconButton aria-label="detail" onClick = {() => saveJob(currentJob)}> 
              <DetailsIcon />
            </IconButton>
          }
          title =  {`${title}`}
          subheader= {`${company}`}
        />

        <CardMedia height="140"
        className={classes.media}
          image={`${company_logo}`}
  
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
          <Button variant="outlined" size="small" color="primary" className={classes.margin}>
          Apply
        </Button>
        </CardActions>
      </Card>
    )
}



export default JobCard;
