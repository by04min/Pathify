import { useState } from 'react';
import { useNavigate } from 'react-router';
import './Connection.css';
import { SearchBar } from '../components/SearchBar.jsx';
import { SearchResultsList } from '../components/SearchResultsList.jsx';

const Connection = () => {
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
