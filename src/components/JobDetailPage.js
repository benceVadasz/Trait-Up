import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from '@material-ui/core/Link';
import parse from 'html-react-parser';
import axios from "axios";
import {BASE_URL} from "../constants";
import ApplyModal from "./ApplyModal";
import Spinner from "react-spinner-material";
import favouriteModel from "../models/favouriteModel";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1900,
  },
  text: {
    fontFamily: 'Lato, sans-serif',
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
    backgroundColor: "#859DF4",
  },
  link: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    }
  },
  liked: {
    color: 'red'
  },
  load: {position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}
}));


const JobDetailPage = ({id}) => {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState({});
  const user = JSON.parse(sessionStorage.getItem("user"));

  const addToFavourites = favouriteModel.useStoreActions((actions) => actions.addToFavourites);
  const removeFromFavourites = favouriteModel.useStoreActions((actions) => actions.removeFromFavourites);
  const getFavouritesOfUser = favouriteModel.useStoreActions((actions) => actions.getFavourites);
  const favourites = favouriteModel.useStoreState((state) => state.favourites);

  const classes = useStyles();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setLoading(true)
    getFavouritesOfUser()
    axios
      .get(
        `${BASE_URL}/Trait-Up-Backend/public/api/getJobById`,
        {
          params: {
            id: id['id']
          },
        }
      ).then((res) => {
      setJob(JSON.parse(res.data['job']))
      setLoading(false)
    })
      .catch(function (error) {
        alert('Could not load job details');
      });
    if (favourites.length > 0) {
      for (let fav of favourites) {
        if (fav.job_id === id.id) {
          setLiked(true);
        }
      }
    }

  }, []);


  const handleFavouriteEvent = () => {
    if (user) {
      if (liked) {
        removeFromFavourites(job.job_id)
        setLiked(false)
      } else {
        if (addToFavourites(job)) {
          setLiked(!liked);
        }
      }
    } else {
      alert('You have to log in to like jobs')
    }
  }


  if (loading)
    return (
      <div className={classes.load}>
        <Spinner
          size={120}
          spinnerColor={"#333"}
          spinnerWidth={2}
          visible={true}
          color={'black'}/>
      </div>
    );

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            TUp
          </Avatar>
        }
        title={`${job.title}`}
        subheader={`${job.company}`}
      />
      <CardContent>

        <Typography className={classes.text} variant="body2" color="textSecondary" component="span">
          Job type: {`${job.type}`}
        </Typography>
        <Typography className={classes.text} variant="body2" color="textSecondary" component="span">
          Location: {`${job.location}`}
        </Typography>
        <Typography className={classes.text} variant="body2" color="textSecondary" component="span">
          Created at: {`${job.created_at}`}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography className={classes.text} variant="body2">
          {parse(`<div>${job.description}</div>`)}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography className={classes.link}>
          <Link to={`${job.url}`} onClick={() => {
            window.open(`${job.url}`)
          }}>
            See position on GitHub Job
          </Link>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={handleFavouriteEvent}
          className={liked ? classes.liked : ''} aria-label="add to favorites">
          <FavoriteIcon/>
        </IconButton>
        <ApplyModal/>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        > How to apply:
          <ExpandMoreIcon/>
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2">
            {parse(`<div>${job.how_to_apply}</div>`)}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default JobDetailPage;
