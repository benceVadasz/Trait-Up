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

  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/Trait-Up-Backend/public/api/jobs`,
        {
          params: {limit: 50}
        })
      .then((response) => {
        setLoading(false);
        const {data} = response;
        let result = JSON.parse(data["jobs"])
        result.forEach(job => {
          if (!uniqueLocations.includes(job.location)) {
            uniqueLocations.push(job.location);
          }
        })
        setHasMore(result.length > 0)
        setAllLocations(uniqueLocations);
        setAllJobs(result);
        setJobs(result);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <JobsContext.Provider value={{jobs, setJobs, allJobs, allLocations, loading, hasMore}}>
      {props.children}
    </JobsContext.Provider>
  )


};