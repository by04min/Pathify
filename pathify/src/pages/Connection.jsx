import React, { useState, useContext } from 'react';
import {AuthContext} from './AuthContext.jsx'

const Connection = () => {
    const {isSignedIn} = useContext(AuthContext);
    return(
        <div>
            Connection page
            <button onClick={() => navigate('/')}>Return to Home Page</button>
            <button onClick={() => navigate('/login')}>{isSignedIn ? 'Manage Account' : 'Sign In to View Connections'}</button>
            
        </div>
    );
}

export default Connection;