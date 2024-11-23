import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import {AuthContext} from '../components/AuthContext.jsx'

const Connection = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    return(
        <div>
            Connection page
            <button onClick={() => navigate('/')}>Return to Home Page</button>
            <button onClick={() => navigate('/login')}>{user ? 'Manage Account' : 'Sign In to View Connections'}</button>
            
        </div>
    );
}

export default Connection;