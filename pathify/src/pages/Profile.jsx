import React, { useState, useContext } from 'react';
import {AuthContext} from './AuthContext.jsx'

const Profile = () => {
    const {isSignedIn} = useContext(AuthContext);
    return(
        <div>
            Profile page
            <button onClick={() => navigate('/')}>Return to Home Page</button>
            {isSignedIn ? <p>Welcome to your profile</p> : <button onClick={() => navigate('/login')}>Login to View Profile</button>}
        </div>
    );
}

export default Profile;