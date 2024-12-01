import React from 'react';
import { useNavigate } from 'react-router-dom';

import JobCard from '../components/JobCard.jsx';
import "./Profile.css"

const Profile = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/add-new-experience');
    };
    
    return (
        <div>
        <div className="profile-info-container">
            <h1>My Profile</h1>
            <div className="basic-profile-info">
               <div className="profile-details">
                    <img src="https://via.placeholder.com/150" alt="Profile picture" className="profile-picture" />
                    <div className="profile-name-school-major">
                        <h2>Bethany Kim</h2>
                        <h3>UCLA</h3>
                        <h3>Cognitive Science</h3>
                    </div>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta.</p>
            </div>
            <JobCard/>
        </div>
        <button onClick={handleClick} className="add-experience">Add new experience</button>
        </div>
    );
};

export default Profile;