import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return(
        <div>
            Homepage
            <button onClick={() => navigate('/profile')}>click me</button>
            <button onClick={() => navigate('/auth')}>authenticate</button>
        </div>

        
    )
}

export default Home;