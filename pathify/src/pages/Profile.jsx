import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../components/AuthContext.jsx';
import JobCard from '../components/JobCard.jsx';
import "./Profile.css"

const Profile = () => {
  const navigate = useNavigate();
  const { profile } = useContext(AuthContext);
  
  return (
    profile ? (
    <div>
      <div className="profile-info-container">
        <h1>My Profile</h1>
        <div className="basic-profile-info">
          <div className="profile-details">
            <div className="profile-name-school-major">
              <h2>{profile.username}</h2>
              <p><strong>Industry:</strong> {profile?.industry || <span className="no-info-default">"Edit profile to add industry..."</span> }</p>
              <p><strong>Major:</strong> {profile?.major || <span className="no-info-default">"Edit profile to add major..."</span>}</p>

            </div>
          </div>
        </div>
        <hr className="prof-divider" />
        <h2 className="experience-title">Experiences: </h2>
          {(!profile.experiences || profile.experiences.length === 0)  ? (
            <p className="no-info-default">Add experiences here...</p>
          ) : (
            profile.experiences.map((row, index) => {
              return <JobCard key={index} expObj={row} />;
            })
          )}
      </div>
      <div className="profile-buttons">
        <button onClick={()=> navigate('/add-new-experience')} className="add-experience">Add New Experience</button>
        <button onClick={()=> navigate('/edit-profile')} className="edit-profile">Edit Profile</button>
      </div>
    </div>
    ) : <p className='profile-loading'> Loading... </p>
  );
};

export default Profile;