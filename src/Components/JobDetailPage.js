
import React from 'react';
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
import { blue, red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 1900,
      
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
    },
    link: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
          },
    }
    
  }));


const JobDetailPage = ({job, props}) => {
    const { history, match } = props;
    const preventDefault = (event) => event.preventDefault();

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

      <CardContent>
          <Typography variant="body2">
          {`${job.description}`}
          </Typography>
      </CardContent>
      
      <CardContent>
        <Typography className={classes.link}>
        <Link href={`${job.url}`} onClick={() => {history.push(`${job.url}`)}}>
            See position on GitHub Job
        </Link>
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
        > How to apply:
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>How to apply:</Typography>
          <Typography variant="body2">
          {`${job.description}`}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    )
}

export default JobDetailPage
