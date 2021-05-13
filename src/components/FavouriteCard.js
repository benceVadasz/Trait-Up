import {makeStyles, useTheme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import React, {useContext, useState} from 'react';
import DetailsIcon from '@material-ui/icons/Details';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {BASE_URL} from "../constants";
import {JobContext} from "../contexts/JobDetailContext";
import {Link} from "react-router-dom";
import {useMediaQuery} from "@material-ui/core";


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

const FavouriteCard = ({props, job}) => {
  const token = sessionStorage.getItem("token");
  const classes = useStyles();
  const {history} = props;
  const [currJob, setJob] = useContext(JobContext);
  const [liked, setLiked] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  const removeFromFavourites = () => {
    axios({
      method: "post",
      url:
        `${BASE_URL}/Trait-Up-Backend/public/api/removeFromFavourites`,
      headers: {Authorization: "Bearer " + token},
      params: {
        id : job.job_id
      }
    }).then(() => {
      setLiked(true);
    })
      .catch(function (error) {
        alert('You have to log in to add jobs to your favourites');
      });
  }

  return (
    <Card className={!isMobile ? classes.root : classes.mobileRoot}>
      <Link className={classes.link + ' link'} to={"/jobs/" + job.job_id}>
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
        <IconButton className={liked ? classes.liked : ''} onClick={removeFromFavourites} aria-label="add to favorites">
          <FavoriteIcon/>
        </IconButton>
        <Button variant="outlined" size="small" color="primary" className={classes.margin}>
          Apply
        </Button>
      </CardActions>
    </Card>
  )
}


export default FavouriteCard;
