import {JobsContext} from '../Contexts/JobsContext';
import React, {useContext} from 'react';
import JobDetailPage from '../Components/JobDetailPage';
import {AppBar, Toolbar, Grid } from "@material-ui/core";

const JobDetail = props => {
    const { history, match } = props;
    const { params } = match;
    const { jobId } = params;
    const jobs = useContext(JobsContext);
    const currentJob = jobs[jobId];
    console.log(currentJob)

    

    return (
        <>
        <AppBar position="static">
          <Toolbar/>
        </AppBar>
        <Grid>
            <Grid item xs={12}>
                <JobDetailPage key={currentJob.id} job={currentJob} props={props}/>
            </Grid>
        </Grid>
        </>
    )
}

export default JobDetail;
