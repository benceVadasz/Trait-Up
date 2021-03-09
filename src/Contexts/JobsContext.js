import React,{createContext, useState, useEffect} from 'react';
import axios from "axios";

export const JobsContext = createContext();

export const JobsProvider = props => {

    const [jobs, setJobs] = useState([
        {
            id: "bbdb156d-19e5-43da-81c5-c19a5f4223b9",
            type: "Full Time",
            url: "https://jobs.github.com/positions/bbdb156d-19e5-43da-81c5-c19a5f4223b9",
            created_at: "Tue Mar 09 19:10:53 UTC 2021",
            company: "Nanny Nina",
            company_url: "http://nannynina.com/",
            location: "Amsterdam Netherlands",
            title: "senior full-stack developer in Amsterdam ✨💻📱🤓🏆🥇🦸‍♂️🚲🧀",
            description: "Are you one of the best in what you do? Looking for a challenging job and willing to relocate to the Netherlands (Amsterdam)?...........",
            how_to_apply : "If you would like to apply, please fill in this assignment below. We want to make sure you are a great match with the team, and the best in what you do...",
        },
        {
            id: "6e8e7cf0-8e88-4ac7-8793-fa00e5b269c7",
            type: "Full Time",
            url: "https://jobs.github.com/positions/6e8e7cf0-8e88-4ac7-8793-fa00e5b269c7",
            created_at: "Tue Mar 09 17:43:07 UTC 2021",
            company: "Agiloft Inc",
            company_url: "http://www.agiloft.com",
            location: "Czech Republic, Ukraine, Hungary, Russia",
            title: "Junior EJB Developer (Remote)",
            description: "<p><strong>THRIVE WITH AGILOFT</strong></p>\n<p>Are you a Java Developer who is successful, motivated, smart, energetic, and looking for a rewarding position in a growing, profitable, and dynamic company?</p>\n<p>Agiloft is looking for junior developers that thrive working in a fast-paced organization with interesting business challenges requiring smart solutions.</p>\n<p><strong>WHY JOIN AGILOFT?</strong></p>\n<ul>\n<li>\n<p>Agiloft was named...",
            how_to_apply: "<p>To complete an application for immediate consideration visit...",
        },
        {
            id: "6e8e7cf0-8e88-4ac7-8793-fa00e5b269c7",
            type: "Full Time",
            url: "https://jobs.github.com/positions/6e8e7cf0-8e88-4ac7-8793-fa00e5b269c7",
            created_at: "Tue Mar 09 17:43:07 UTC 2021",
            company: "Agiloft Inc",
            company_url: "http://www.agiloft.com",
            location: "Czech Republic, Ukraine, Hungary, Russia",
            title: "Junior EJB Developer (Remote)",
            description: "<p><strong>THRIVE WITH AGILOFT</strong></p>\n<p>Are you a Java Developer who is successful, motivated, smart, energetic, and looking for a rewarding position in a growing, profitable, and dynamic company?</p>\n<p>Agiloft is looking for junior developers that thrive working in a fast-paced organization with interesting business challenges requiring smart solutions.</p>\n<p><strong>WHY JOIN AGILOFT?</strong></p>\n<ul>\n<li>\n<p>Agiloft was named...",
            how_to_apply: "<p>To complete an application for immediate consideration visit...",
        }
    
    ]);

    useEffect(() => {
        const newJobsData = {};
        jobs.forEach((job, index) => {
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
    
    }, []);

    return (
        <JobsContext.Provider value={jobs}>
            {props.children}
        </JobsContext.Provider>
    )

    
};