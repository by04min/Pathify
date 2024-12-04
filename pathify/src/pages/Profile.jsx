import React from 'react';
import { useNavigate } from 'react-router-dom';

import JobCard from '../components/JobCard.jsx';
import "./Profile.css"

const Profile = () => {
    const navigate = useNavigate();
    const handleExpClick = () => {
        navigate('/add-new-experience');
    };
    const handleEditProfileClick = () => {
        navigate('/edit-profile');
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
        <div className="profile-buttons">
            <button onClick={handleExpClick} className="add-experience">Add New Experience</button>
            <button onClick={handleEditProfileClick} className="edit-profile">Edit Profile</button>
        </div>
        </div>
    );
};

export default Profile;