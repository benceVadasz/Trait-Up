
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
          },
    }
  }));


const JobDetailPage = ({job, props}) => {
    const [expanded, setExpanded] = React.useState(false);
    const classes = useStyles();
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            TUp
          </Avatar>
        }
        title =  {`${job.title}`}
        subheader= {`${job.company}`}
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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <Button variant="outlined" size="small" color="primary" className={classes.margin}>
          Apply
        </Button>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        > How to apply:
          <ExpandMoreIcon />
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
