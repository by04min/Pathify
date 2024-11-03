import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return(
        <div>
            <button className="button-text" onClick={() => navigate('/profile')}>Home</button>
        </div>
    )
}

export default Home;