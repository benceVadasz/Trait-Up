import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import React, {useContext} from 'react';
import DetailsIcon from '@material-ui/icons/Details';
import {JobContext} from '../Contexts/JobDetailContext';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import axios from 'axios';


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

const JobCard = ({props, jobId, jobs}) => {
    const token = sessionStorage.getItem("token");
    const classes = useStyles();
    const {history} = props;
    const [job, setJob] = useContext(JobContext);

    const {id, type, created_at, company, location, title, description, company_logo, url, how_to_apply} = jobs[jobId];

    const saveJob = (id, type, created_at, company, location, title, description, url, how_to_apply) => {
        const currentJob = {id, type, created_at, company, location, title, description, url, how_to_apply};
        setJob(currentJob);
        history.push(`/jobs/${id}`)
    }

    const handleFavouriteEvent = () => {
        axios({
            method: "post",
            url:
                "http://localhost:8888/Trait-Up-Backend/public/api/addToFavourites",
            headers: {Authorization: "Bearer " + token},
            params: {
                id, type, created_at, company, location, title, company_logo
            }
        }).then(() => {
            window.location.href = "/mail/inbox";
        });
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
                    <IconButton aria-label="detail"
                                onClick={() => saveJob(id, type, created_at, company, location, title, description, url, how_to_apply)}>
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
                <IconButton onClick={handleFavouriteEvent} aria-label="add to favorites">
                    <FavoriteIcon/>
                </IconButton>
                <Button variant="outlined" size="small" color="primary" className={classes.margin}>
                    Apply
                </Button>
            </CardActions>
        </Card>
    )
}


export default JobCard;
