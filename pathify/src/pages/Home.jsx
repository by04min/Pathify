import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext.jsx';
import './Home.css'

function Home() {
    const navigate = useNavigate();
    const {isSignedIn, handleSignIn, handleSignOut} = useContext(AuthContext);
    //boolean signedIn = false;
    return(
        <div>
            <h1 class ="title"> Start Your Career Journey: </h1>
            <div className = "buttonDisplay">
                <button className ="Button" onClick={() => navigate('/profile')}>Back to Home Page</button>
                <button className ="Button" onClick={() => navigate('/login')}>Manage Account</button>
                <button className ="Button" onClick={() => navigate('/connection')}>View Connections</button>
            </div>  
        </div>
    )
}

export default Home;