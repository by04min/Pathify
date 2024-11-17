import React, { useState, useContext } from 'react';
import {AuthContext} from './AuthContext.jsx'

const Connection = () => {
    const {isSignedIn} = useContext(AuthContext);
    return(
        <div>
            Connection page
            {isSignedIn ? <p>Welcome to your Connections</p> : <button onClick={() => navigate('/')}>Sign In to View Connections</button>}
            
        </div>
    );
}

export default Connection;