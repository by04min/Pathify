import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getProfile } from '../services/profileServices.js';
import JobCard from '../components/JobCard.jsx';
import "./Profile.css"

const Profile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  
  const populateData = async () => {
    const data = await getProfile();
    setProfile(data[0]);
  }
  useEffect(() => {
    populateData();
  }, [])
    
  return (
    profile ? (
    <div>
      <div className="profile-info-container">
        <h1>My Profile</h1>
        <div className="basic-profile-info">
          <div className="profile-details">
            <div className="profile-name-school-major">
              <h2>{profile.username}</h2>
              <h3>{profile?.industry || "Edit profile to add industry..."}</h3>
              <h3>{profile?.major || "Edit profile to add major..."}</h3>
            </div>
          </div>
        </div>
        <h3>Experiences: </h3>
        {profile.experiences.map((row, index) => {
          return (<JobCard key={index} expObj={row} />);
        })}
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