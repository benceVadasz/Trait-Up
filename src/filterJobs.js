import { useContext, useEffect } from "react";
import axios from "axios";
import { JobsContext } from "./contexts/JobsContext";

export default function useFetchJobs(type, value) {
  const [jobs, setJobs] = useContext(JobsContext);
  const filteredJobs = [];
  jobs.map(job => {
    if (type === "type") {
      if (job.type.includes(value)) {
        filteredJobs.push()   
      } 
      else {
        if (job.location.includes(value)) {
          filteredJobs.push()   
        } 
      }
    }
    setJobs(filteredJobs)
  });
  return jobs;
}
