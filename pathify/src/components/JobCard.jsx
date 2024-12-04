import React from 'react';
import './JobCard.css';

const JobExperience = ({ expObj }) => {
  return (
    <div className="job-experience-container">
      <div className="job-experience-header">
        <div className="job-experience-header-details">
          <p>{expObj.company}</p>
          <p>{expObj.job}</p>
          <p>{expObj.start} - {expObj.end}</p>
        </div>
      </div>
      <div className="divider"></div>
      <div className="role-description">
        <p>Role Description:</p>
        <p>{expObj.description}</p>
      </div>
      <div className="divider"></div>
      <div className="reflection-section">
        <p>Reflection:</p>
        <p>{expObj.reflection}</p>
      </div>
    </div>
  );
};

export default JobExperience;