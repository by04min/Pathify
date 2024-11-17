import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from './AuthContext.jsx'

const Login = () => {
    const navigate = useNavigate();
    const {isSignedIn, handleSignIn, handleSignOut} = useContext(AuthContext);

    return(
        <div>
            <p>You are currently {isSignedIn ? 'signed in' : 'signed out'}</p>
            <button onClick={() => navigate('/')}>Return to Home Page</button>
            {!isSignedIn ? (
                <button onClick={handleSignIn}>Sign In with Google</button>
            ) : (
                <button onClick={handleSignOut}>Sign Out </button>
            )}

        </div>
    );
}

export default Login;