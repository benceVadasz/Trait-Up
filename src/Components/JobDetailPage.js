import {JobsContext} from '../Contexts/JobsContext';
import React, {useContext} from 'react';

const JobDetailPage = ({jobId, props}) => {

    const jobs = useContext(JobsContext);
    const {id, type, url, created_at, company, company_url, location, title, description, how_to_apply} = jobs[jobId];

    return (
        <div>
            {`${title}`}
            {`${type}`}
            {`${company}`}
            {`${description}`}
        </div>
    )
}

export default JobDetailPage;
