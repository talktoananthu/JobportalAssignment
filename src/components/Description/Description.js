import React, { useState, useEffect } from 'react';
import './Description.css';
import axios from 'axios';

function Description({ search, SetSearch, SetExperience, experience }) {
    const Url = 'https://raw.githubusercontent.com/talktoananthu/JobPortal/refs/heads/main/job.json';
    const [jobs, SetJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]); 

    useEffect(() => {
        axios.get(Url)
            .then((response) => {
                SetJobs(response.data.jobs);
                setFilteredJobs(response.data.jobs); 
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        let filtered = jobs;

        if (experience) {
            filtered = filtered.filter(job => job.experience_level === experience);
        }
        
        if (search) {
            filtered = filtered.filter(job => job.title.includes(search));
        }

        setFilteredJobs(filtered);
    }, [search, experience, jobs]);

    return (
        <div className="Description">
            <div className="Content">
                <p className="Filter">Filters</p>
                <div className="FilterDesc">
                    <p className="WorkSchedule">Working Schedule</p>
                    <label>
                        <input type="checkbox" className="Fulltime" /> Full-time
                    </label>
                    <label>
                        <input type="checkbox" className="Fulltime" /> Internship
                    </label>
                </div>
            </div>

            <div className="OpeningAvailable">
                <p className="Available">Available Openings</p>
                <div className="Openings">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((item, index) => (
                            <div key={index} className="JobDetails">
                                <div className="CompanyDetail">
                                    <p className="Date">{item.posted_date}</p>
                                    <p className="Companytitle">{item.company}</p>
                                    <p className="Jobtitle">{item.title}</p>
                                </div>
                                <div className="BelowDesc">
                                    <p className="JobType">{item.job_type}</p>
                                    <p className="JobType">{item.experience_level}</p>
                                    <button className="Apply">Apply</button>
                                </div>
                                <p className="Location">{item.location}</p>
                            </div>
                        ))
                    ) : (
                        <p className="NoJobs">No matching jobs found</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Description;
