import React, { useState, useEffect } from 'react';
import './Nav.css'; 
import Description from "../Description/Description";
import axios from 'axios';

function Nav() {
    const Url = 'https://raw.githubusercontent.com/talktoananthu/JobPortal/refs/heads/main/job.json';

    const [search, SetSearch] = useState('');
    const [experience, SetExperience] = useState('');
    const [location, SetLocation] = useState('');
    const [jobs, SetJobs] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [locSuggestions, setLocSuggestions] = useState([]); // Suggestions for locations

    useEffect(() => {
        axios.get(Url)
            .then((response) => {
                SetJobs(response.data.jobs);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    // Job title search suggestion
    const handleSearchChange = (e) => {
        const input = e.target.value;
        SetSearch(input);

        if (input.length > 0) {
            const filtered = jobs
                .map(job => job.title)
                .filter(title => title.includes(input)); // No case conversion
            setSuggestions(filtered);
        } else {
            setSuggestions([]); // Clear suggestions when empty
        }
    };

    const handleSuggestionClick = (value) => {
        SetSearch(value);
        setSuggestions([]); // Hide suggestions after selection
    };

    // Location suggestion logic
    const handleLocationChange = (e) => {
        const input = e.target.value;
        SetLocation(input);

        if (input.length > 0) {
            const filtered = [...new Set(jobs
                .map(job => job.location)
                .filter(loc => loc.includes(input)) // No case conversion
            )];
            setLocSuggestions(filtered);
        } else {
            setLocSuggestions([]); // Clear when empty
        }
    };

    const handleLocationClick = (value) => {
        SetLocation(value);
        setLocSuggestions([]); // Hide suggestions after selection
    };

    return (
        <div className='Nav'>
            <div className='Buttons'>
                <button className='Job'>Jobs</button>
                <button className='Applied'>Applied</button>
                <button className='Profile'>Profile</button>
            </div>

            <div className='Queries'>
                <input  // Job title
                    type="text"
                    value={search}
                    className="search"
                    placeholder="SEARCH"
                    onChange={handleSearchChange}
                />
                {suggestions.length > 0 && (
                    <ul className="suggestions">
                        {suggestions.map((suggestion, index) => (
                            <li className="listCart" key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}

                <select value={experience} onChange={(e) => SetExperience(e.target.value)} className="Experience">
                    <option value="">Experience Level</option>
                    <option value="Junior">Junior</option>
                    <option value="Mid">Mid</option>
                    <option value="Senior">Senior</option>
                </select>

                <input  // Location search bar
                    type="text"
                    value={location}
                    className="search"
                    placeholder="Work Location"
                    onChange={handleLocationChange}
                />
                {locSuggestions.length > 0 && (
                    <ul className="Locsuggestions">
                        {locSuggestions.map((suggestion, index) => (
                            <li className="listLoc" key={index} onClick={() => handleLocationClick(suggestion)}>
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <Description search={search}   experience={experience} location={location} />
        </div>
    );
}

export default Nav;

