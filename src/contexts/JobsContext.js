import React, {createContext, useState, useEffect} from 'react';
import axios from "axios";
import {BASE_URL} from "../constants";

export const JobsContext = createContext();

export const JobsProvider = props => {

  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const uniqueLocations = [];
  const [allLocations, setAllLocations] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/Trait-Up-Backend/public/api/jobs`)
      .then((response) => {
        setLoading(false);
        const {data} = response;
        let result = JSON.parse(data["jobs"])
        result.forEach(job => {
          if (!uniqueLocations.includes(job.location)) {
            uniqueLocations.push(job.location);
          }
        })

        setAllLocations(uniqueLocations);
        setAllJobs(result);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <JobsContext.Provider value={{jobs, setJobs, allJobs, allLocations, loading}}>
      {props.children}
    </JobsContext.Provider>
  )


};