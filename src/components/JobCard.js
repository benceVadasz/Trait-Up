import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import React, {useContext, useEffect, useState} from 'react';
import DetailsIcon from '@material-ui/icons/Details';
import {JobContext} from '../contexts/JobDetailContext';
import CardMedia from '@material-ui/core/CardMedia';
import {useStoreActions, useStoreState} from "easy-peasy";
import ApplyModal from "./ApplyModal";

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
  liked: {
    color: 'red'
  }

}));

const JobCard = ({props, jobId, jobs}) => {
  const classes = useStyles();
  const {history} = props;
  const [job, setJob] = useContext(JobContext);
  const [liked, setLiked] = useState(false);
  const addToFavourites = useStoreActions((actions) => actions.addToFavourites);
  const removeFromFavourites = useStoreActions((actions) => actions.removeFromFavourites);

  const {
    id: job_id,
    type,
    created_at,
    company,
    location,
    title,
    description,
    company_logo,
    url,
    how_to_apply
  } = jobs[jobId];




  const viewJob = (id, type, created_at, company, location, title, description, url, how_to_apply) => {
    const currentJob = {job_id, type, created_at, company, location, title, description, url, how_to_apply};

    setJob(currentJob);
    history.push(`/jobs/${id}`)
  }


  const likeSetter = () => {
    setLiked(!liked)
  }

  const handleFavouriteEvent = () => {
    if (sessionStorage.getItem('token')) {
      const currentJob = {
        job_id,
        type,
        created_at,
        company,
        location,
        title,
        description,
        url,
        how_to_apply,
        company_logo
      };
      if (liked) {
        setLiked(false)
        removeFromFavourites(currentJob.job_id)
      } else {
        if (addToFavourites(currentJob)) {
          likeSetter();
        }
      }
    } else {
      alert('You have to log in to like jobs')
    }
  }

  const favouriteJobs = useStoreState((state) => state.favourites);
  useEffect(() => {
    if (favouriteJobs.length > 0) {
      for (let fav of favouriteJobs) {
        if (fav.job_id === job_id) {
          setLiked(true);
        }
      }
    }
    // eslint-disable-next-line
  }, [favouriteJobs]);


  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            TUp
          </Avatar>
        }
        action={
          <IconButton aria-label="detail"
                      onClick={() => viewJob(job_id, type, created_at, company, location, title, description, url, how_to_apply)}>
            <DetailsIcon/>
          </IconButton>
        }
        title={`${title}`}
        subheader={`${company}`}
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
        <IconButton className={liked ? classes.liked : ''} onClick={handleFavouriteEvent} aria-label="add to favorites">
          <FavoriteIcon/>
        </IconButton>
        <ApplyModal jobId={job_id} title={title} type={type} location={location} description={description}
                    created_at={created_at} company={company} url={url} how_to_apply={how_to_apply} company_logo={company_logo}></ApplyModal>
      </CardActions>
    </Card>
  )
}


export default JobCard;
