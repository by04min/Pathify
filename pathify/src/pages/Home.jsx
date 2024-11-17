import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'

function Home() {

    const navigate = useNavigate();

    return(
        <div>
            <h1 class ="title"> Start Your Career Journey: </h1>
            <div className = "buttonDisplay">
                <button className ="Button" onClick={() => navigate('/profile')}>Back to Home Page</button>
                <button className ="Button" onClick={() => navigate('/auth')}> Sign out </button>
            </div>
        </div>

        
    )
}

export default Home;