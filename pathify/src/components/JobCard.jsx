import React from 'react';
import './JobCard.css';

const JobExperience = () => {
  return (
    <div className="job-experience-container">
      <div className="job-experience-header">
        <div className="job-experience-header-details">
          <p>Company name</p>
          <p>Job Title</p>
          <p>Date - Date</p>
        </div>
      </div>
      <div className="divider"></div>
      <div className="role-description">
        <p>Role Description:</p>
        <p>Lorem ipsum dolor</p>
      </div>
      <div className="divider"></div>
      <div className="reflection-section">
        <p>Reflection:</p>
        <p>Lorem ipsum dolor</p>
      </div>
    </div>
  );
};

export default JobExperience;