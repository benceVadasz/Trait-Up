import React, {createContext, useState, useEffect} from 'react';

export const JobContext = createContext();

export const JobProvider = props => {

    const [job, setJob] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("job")){
            setJob(JSON.parse(localStorage.getItem("job")))
        }
       
    }, [setJob])


    const saveJob = (job) => {
        setJob(job)
        localStorage.setItem("job",JSON.stringify(job))
    }



    return (
        <JobContext.Provider value={[job, saveJob]}>
            {props.children}
        </JobContext.Provider>

    )
}