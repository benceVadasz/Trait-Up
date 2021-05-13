import {makeStyles, useTheme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import FavoriteIcon from '@material-ui/icons/Favorite';
import React, {useEffect, useState} from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import {useStoreActions, useStoreState} from "easy-peasy";
import ApplyModal from "./ApplyModal";
import {useMediaQuery} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 200,

  },
  mobileRoot: {
    width: '95%',
    marginTop: 10,
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
  },
  link: {
    textDecoration: 'none',
    color: "black"
  }

}));

const JobCard = ({job, isApplied}) => {
  const classes = useStyles();
  const [liked, setLiked] = useState(false);
  const addToFavourites = useStoreActions((actions) => actions.addToFavourites);
  const removeFromFavourites = useStoreActions((actions) => actions.removeFromFavourites);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const likeSetter = () => {
    setLiked(!liked)
  }

  const handleFavouriteEvent = () => {
    if (sessionStorage.getItem('token')) {
      if (liked) {
        setLiked(false)
        removeFromFavourites(job.id)
      } else {
        if (addToFavourites(job)) {
          likeSetter();
        }
      }
    } else {
      alert('You have to log in to like jobs')
    }
  }

  // const favouriteJobs = useStoreState((state) => state.favourites);
  // useEffect(() => {
  //   if (favouriteJobs && favouriteJobs.length > 0) {
  //     for (let fav of favouriteJobs) {
  //       if (fav.job_id === job.id) {
  //         setLiked(true);
  //       }
  //     }
  //   }
  //   // eslint-disable-next-line
  // }, []);


  return (
      <Card  className={!isMobile ? classes.root : classes.mobileRoot}>
        <Link className={classes.link + ' link'} to={"/jobs/" + job.id}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              TUp
            </Avatar>
          }
          title={`${job.title}`}
          subheader={`${job.company}`}
        />
          {!isMobile ? <CardMedia height="140"
                      className={classes.media}
                      image={`${job.company_logo}`}
          /> : null}
        </Link>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Job type: {`${job.type}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Location: {`${job.location}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Created at: {`${job.created_at}`}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton className={liked ? classes.liked : ''}
            onClick={handleFavouriteEvent}
                      aria-label="add to favorites">
            <FavoriteIcon/>
          </IconButton>
          {!isApplied ?
            <ApplyModal jobId={job.id} title={job.title} type={job.type}
                        location={job.location} description={job.description}
                        created_at={job.created_at} company={job.company}
                        url={job.url} how_to_apply={job.how_to_apply}
                        company_logo={job.company_logo}>

            </ApplyModal> : null
          }

        </CardActions>
      </Card>
  )
}


export default JobCard;
