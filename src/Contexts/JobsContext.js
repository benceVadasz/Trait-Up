import React,{createContext, useState, useEffect} from 'react';
import axios from "axios";

export const JobsContext = createContext();

export const JobsProvider = props => {

    const [jobs, setJobs] = useState([]);
    console.log(jobs)


     useEffect(() => {
         axios
             .get(`https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json`)
             .then((response) => {
                 const { data } = response;
                 const newJobsData = {};
  
                 data.forEach((job, index) => {
                    newJobsData[index + 1] = {
                        id: index + 1,
                        type: job.type,
                        url: job.url,
                        created_at: job.created_at,
                        company: job.company,
                        location: job.location,
                        title: job.title,
                        description: job.description,
                        how_to_apply: job.how_to_apply,
                     }
                 });
                 setJobs(newJobsData);
                
             });
    
     }, []);

    return (
        <JobsContext.Provider value={jobs}>
            {props.children}
        </JobsContext.Provider>
    )

    
};