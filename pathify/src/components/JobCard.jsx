import React from 'react';
import './JobCard.css';

const JobExperience = ({ expObj }) => {
  return (
    <div className="job-experience-container">
      <div className="job-experience-header">
        <div className="job-experience-header-details">
          <p><strong>Company: </strong>{expObj.company}</p>
          <p><strong>Position: </strong>{expObj.job}</p>
          <p><strong>Term: </strong>{expObj.start} to {expObj.end}</p>
        </div>
      </div>
      <div className="divider"></div>
      <div className="role-description">
        <p><strong>Role Description:</strong></p>
        <p>{expObj.description}</p>
      </div>
      <div className="divider"></div>
      <div className="reflection-section">
        <p><strong>Reflection:</strong></p>
        <p>{expObj.reflection}</p>
      </div>
    </div>
  );
};

export default JobExperience;