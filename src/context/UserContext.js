import React, { useState, createContext} from 'react';
import batman from '../images/batman.jpg';


export const UserContext = createContext();


export const UserProvider = (props) => {

    const [user, setUser] = useState({
        name: "Sherlock Holmes",
        email: "sherlock@holmes.com",
        password: "1234",
        address: "221B Baker Street, London",
        location: "London",
        phone: "+36/20-111-2233",
        photo: batman,
        languages: ["english", "german", "esperanto"],
        education: [
            {
                type: "university",
                school: "Oxford University",
                degree: "Forensic science",
                level: "Msc",
                from: "1880-09-01",
                to: "1882-06-01"
            },
            {
                type: "university",
                school: "Cambridge University",
                degree: "Psychology",
                level: "PhD",
                from: "1882-09-01",
                to: "1884-06-01"
            }
        ],
        experience: [
            {
                jobTitle: "detective",
                employer: "Scotland Yard",
                from: "1884-06-01",
                to: "1890-06-01"
            },
            {
                jobTitle: "consultant",
                employer: "Interpol",
                from: "1884-06-01",
                to: "1890-06-01"
            }
        ]
    });

    return(
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>        
    );
}