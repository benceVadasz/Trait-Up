import React, {createContext, useState, useEffect} from 'react';
import axios from "axios";
import { BASE_URL } from "../constants";

export const JobsContext = createContext();

export const JobsProvider = props => {

    const [jobs, setJobs] = useState([]);
    const [allJobs, setAllJobs] = useState([]);
    const uniqueLocations = [];
    const [allLocations, setAllLocations] = useState([]);


    useEffect(() => {
        axios
            .get(`${BASE_URL}/Trait-Up-Backend/public/api/jobs`)
            .then((response) => {
                const {data} = response;
                let result = JSON.parse(data["jobs"])
                result.forEach(job => {
                    if (!uniqueLocations.includes(job.location)) {
                        uniqueLocations.push(job.location);
                    }
                })

                setAllLocations(uniqueLocations);
                setAllJobs(data);
                const newJobsData = {};

                result.forEach((job) => {
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
    }, []);


    return (
        <JobsContext.Provider value={{jobs, setJobs, allJobs, allLocations}}>
            {props.children}
        </JobsContext.Provider>
    )


};