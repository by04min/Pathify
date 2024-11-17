
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext.jsx';
import './Home.css'


function Home() {

    // const navigate = useNavigate();
    const navigate = useNavigate();
    const {isSignedIn, handleSignIn, handleSignOut} = useContext(AuthContext);

    return(
        <div>
            <div className='title'>
                "Insert Name" Career Tracker
            </div>
            <div className='table-container'>
                <table>
                    <thead>
                        {/* Main Header Row */}
                        <tr> 
                            <th> Company </th>
                            <th> Position Title </th>
                            <th> Application Deadline </th>
                            <th> Applied </th>
                            <th> Interview </th>
                            <th> Decision </th>
                        </tr>
                    </thead>
                    {/* tbody contains our data with jobs people applied to etc.  */}
                    <tbody> 
                        <tr>
                            {/* Filler until we get out SQL set up */}
                            <td> Microsoft </td>
                            <td> Product Manager Internship </td>
                            <td>  November 2024 </td>
                            <td> Applied  </td>
                            <td> Interviewed </td>
                            <td> Not Released </td>
                        </tr>
                        <tr>
                            {/* Filler until we get out SQL set up */}
                            <td> Microsoft </td>
                            <td> Product Manager Internship </td>
                            <td>  November 2024 </td>
                            <td> Applied  </td>
                            <td> Interviewed </td>
                            <td> Not Released </td>
                        </tr>
                        <tr>
                            {/* Filler until we get out SQL set up */}
                            <td> Microsoft </td>
                            <td> Product Manager Internship </td>
                            <td>  November 2024 </td>
                            <td> Applied  </td>
                            <td> Interviewed </td>
                            <td> Not Released </td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
            
            {/* <div className = "buttonDisplay">
                <button className ="Button" onClick={() => navigate('/profile')}> Back to Home Page</button>
                <button className ="Button" onClick={() => navigate('/auth')}> Sign out </button>
            </div> */}
    )
}

export default Home;