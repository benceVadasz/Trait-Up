import {JobsContext} from '../Contexts/JobsContext';
import React, {useContext} from 'react';
import JobDetailPage from '../Components/JobDetailPage';

const JobDetail = props => {

    const jobs = useContext(JobsContext);

    return (
        <>
            {Object.keys(jobs).map(jobId => 
                 <JobDetailPage key={jobId} jobId={jobId} props={props}/>)}
        </>
    )
}

export default JobDetail;
