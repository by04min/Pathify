import React from 'react';
import "./SearchResult.css";

export const SearchResult = ({result}) => {
    console.log(result);
    return(
        <div className="search-result"
         onClick={(e) => alert('You clicked on ${result}')}>
            <div className="user-info">
                <div className="user-details">
                    <img src="https://via.placeholder.com/150" alt="User Picture" className="user-picture" />
                    <div className="user-specific">
                        <h1>Name: {result.username}</h1>
                        <h2>Email: {result.email}</h2>
                        <h3>Major: {result.major}</h3>                         
                        <h3>Industry: {result.industry}</h3>  
                    </div> 
                </div>
            </div>
        </div>
    )
};