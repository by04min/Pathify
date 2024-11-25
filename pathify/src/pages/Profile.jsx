import React, { useState, useContext } from 'react';
import {AuthContext} from '../components/AuthContext.jsx'

import JobCard from '../components/JobCard.jsx';
import Form from '../components/Form/Form'
import "./Profile.css"

const Profile = () => {
  const {user} = useContext(AuthContext);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const handleClick = () => {
    if (!isFormVisible) {
      setIsFormVisible(true); // Only show the form if it's not already visible
    }
    
    return (
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
            <button onClick={handleClick}>Add new experience</button>
            
            {isFormVisible && <Form />}
        </div>
    );
}
export default Profile;