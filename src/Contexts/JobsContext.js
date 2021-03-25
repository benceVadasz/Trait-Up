import React, {createContext, useState, useEffect} from 'react';
import axios from "axios";


export const JobsContext = createContext();

export const JobsProvider = props => {

    const [jobs, setJobs] = useState([]);
    const [allJobs, setAllJobs] = useState([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const uniqueLocations = [];


    useEffect(() => {
        axios
            .get(`https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json`)
            .then((response) => {
                const {data} = response;
                data.forEach(job => {
                    if (!uniqueLocations.includes(job.location)){
                        uniqueLocations.push(job.location);
                    }
                })
                setAllJobs(data);
                console.log(uniqueLocations);
                const newJobsData = {};

                data.forEach((job) => {
                    newJobsData[job.id] = {
                        id: job.id,
                        type: job.type,
                        url: job.url,
                        created_at: job.created_at,
                        company: job.company,
                        location: job.location,
                        title: job.title,
                        description: job.description,
                        how_to_apply: job.how_to_apply,
                        company_logo: job.company_logo
                    }
                });
                setJobs(newJobsData);


            });

    }, [uniqueLocations]);


    return (
        <JobsContext.Provider value={{jobs, setJobs, allJobs, uniqueLocations}}>
            {props.children}
        </JobsContext.Provider>
    )


};