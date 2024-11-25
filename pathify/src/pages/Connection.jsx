import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import {AuthContext} from '../components/AuthContext.jsx';
import './Connection.css';
import pool from '../../server/db.js';

const Connection = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    let optedIn = true;
    
    const[searchTerm, setSearchTerm] = useState('');
    const[results, setResults] = useState([]);
/*
    const handleSearch = async () => {
        try{
            const response = await pool.get('/api/search?query=${searchTerm}');
            setResults[response.data];
        } catch (error){
            console.error('Search error: ', error);
        }
    }

    
    //in return function

    within <div> </div>
        
            <input
                type = "text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button onClick={handleSearch}>Search</button>
            <ul>
                {
                    results.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))
                }
            </ul>

                       <button class="custom-button" onClick={() => navigate('/Profile')}>{user ? 'Manage Account' : 'Sign In to View Connections'}</button>

    */
    return(

        <div>
            <div className="button-container">
                <button class="custom-button" onClick={() => navigate('/settings')}>Manage Connection Preferences</button>
            </div>
            <div>
                {optedIn &&
                    <div className="results-table">
                        <div className="user-details">
                            <img src="https://via.placeholder.com/150" alt="User Picture" className="user-picture" />
                            User 1
                            
                        </div>
                        
                    </div>
                }
            </div>
        </div>
        


    );
}

export default Connection;