import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import {AuthContext} from '../components/AuthContext.jsx';
import './Connection.css';
import pool from '../../server/db.js';
import { SearchBar } from '../components/Searchbar.jsx';
import { SearchResultsList } from '../components/SearchResultsList.jsx';

const Connection = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    let optedIn = true; //change to based on user preferences
    
    return(
        <div>
            {!optedIn ? (
                <button class="custom-button" onClick={() => navigate('/Profile')}>Sign In to View Connections</button>
            ) : (
                <div className="search-bar-container">
                    <SearchBar setResults={setResults}/>
                    <SearchResultsList results={results}/>
                </div>
            )}
        </div>       
    );
}

export default Connection;
