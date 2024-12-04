import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import JobCard from '../components/JobCard.jsx';
import { searchOther } from '../services/profileServices.js';
import "./Profile.css"

const OtherProfile = () => {
  const { username } = useParams();
  const [otherProfile, setOtherProfile] = useState({});

  const populateData = async () => {
    const data = await searchOther(username);
    console.log(data[0]);
    setOtherProfile(data[0]);
  }
  useEffect(() => {
    populateData();
  }, [])

  return (
    <div>
      {username}
      { otherProfile && otherProfile.length != 0  ? (
        <div>
          <h2>Email is {otherProfile[0]?.email}</h2>
          <h3>Industry is {otherProfile[0]?.industry ? otherProfile.industry : 'N/A'}</h3>
          <h3>Major is {otherProfile[0]?.major ? otherProfile.major : 'N/A'}</h3>
          <h3></h3>
        </div>
      ) : (<div>Unknown!</div>)}
    </div>);
};

export default OtherProfile;