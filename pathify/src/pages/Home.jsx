import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext.jsx';

const Home = () => {
    const navigate = useNavigate();
    const {isSignedIn, handleSignIn, handleSignOut} = useContext(AuthContext);
    //boolean signedIn = false;
    return(
        <div>
            Homepage
            <button onClick={() => navigate('/login')}>Manage Account</button>
            <button onClick={() => navigate('/profile')}>Profile Page</button>
            <button onClick={() => navigate('/connection')}>View Connections</button>
        </div>
        
    )
}

export default Home;