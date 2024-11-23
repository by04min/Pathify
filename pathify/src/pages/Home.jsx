
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext.jsx';
import './Home.css'


function Home() {
    const navigateLogin = useNavigate();
    const {user} = useContext(AuthContext);

    return(
        <div>
            {!user ? (
                <div className="default-welcome">
                    <h1>Welcome to Pathify</h1>
                    <p>Sign in to begin your jouney.</p>
                    <button onClick={() => window.location.href = 'http://localhost:8080/auth/oauth'} className="login-button">
                        Sign In
                    </button>
                </div>
            ) : (
                <div>
            <div className='title'>
                Career Tracker
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
                </div>
            )}
        </div>
    );
}

export default Home;