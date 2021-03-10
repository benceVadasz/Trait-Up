import {JobsContext} from '../Contexts/JobsContext';
import React, {useContext} from 'react';
import JobDetailPage from '../Components/JobDetailPage';

const JobDetail = props => {
    const { history, match } = props;
    const { params } = match;
    const { jobId } = params;
    const jobs = useContext(JobsContext);
    const currentJob = jobs[jobId];
    console.log(currentJob)
    

    return (
        <>
            <JobDetailPage key={currentJob.id} job={currentJob} props={props}/>
        </>
    )
}

export default JobDetail;
