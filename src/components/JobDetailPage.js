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
import Button from '@material-ui/core/Button';
import axios from "axios";
import {BASE_URL} from "../constants";
import {useStoreActions, useStoreState} from "easy-peasy";
import ApplyModal from "./ApplyModal";
import {useParams} from "react-router";
import Spinner from "react-spinner-material";

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
  const [favourites, setFavourites] = useState([]);

  const addToFavourites = useStoreActions((actions) => actions.addToFavourites);
  const removeFromFavourites = useStoreActions((actions) => actions.removeFromFavourites);


  const classes = useStyles();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setLoading(true)
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

  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/Trait-Up-Backend/public/api/getFavouritesOfUser`,
        {headers: {Authorization: "Bearer " + sessionStorage.getItem("token")}})
      .then((response) => {
        console.log(response.data.jobs)
        console.log(id)
        if (response.data.jobs.length > 0) {
          for (let fav of response.data.jobs) {
            if (fav.job_id === id.id) {
              setLiked(true);
            }
          }
        }
      });
  }, []);


  const handleFavouriteEvent = () => {
    if (user) {
      console.log(job)
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

        <Typography className={classes.text} variant="body2" color="textSecondary" component="p">
          Job type: {`${job.type}`}
        </Typography>
        <Typography className={classes.text} variant="body2" color="textSecondary" component="p">
          Location: {`${job.location}`}
        </Typography>
        <Typography className={classes.text} variant="body2" color="textSecondary" component="p">
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
        <ApplyModal></ApplyModal>
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
