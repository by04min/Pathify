import React, { useState, useContext } from 'react';
import {AuthContext} from '../components/AuthContext.jsx'

import Form from '../components/Form/Form'
import "./Profile.css"

const Profile = () => {
  const {user} = useContext(AuthContext);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const handleClick = () => {
    if (!isFormVisible) {
      setIsFormVisible(true); // Only show the form if it's not already visible
    }
  }
  
  return (
    <div className="profile-info-container">
      <h1>TODO: PROFILE INFO</h1>
      <button onClick={handleClick}>Add new experience</button>
      
      {isFormVisible && <Form />}
    </div>
  );
}
export default Profile;