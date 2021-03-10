import React from 'react'

const JobDetail = props => {
    const { history, match } = props;
    const { params } = match;
    const { jobId } = params;
    console.log(jobId)

    return (
        <div>
            HELLO
        </div>
    )
}

export default JobDetail;
