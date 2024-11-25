import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import {StatusDropdown, InterviewDropdown, DecisionDropdown} from  "../components/Dropdown";
import DateSelector from '../components/DateSelector';
import { AuthContext } from '../components/AuthContext.jsx'

function Home() {
    const {user} = useContext(AuthContext);
  
    const [statuses, setStatuses] = useState({
        row1: 'Applied',
        row2: 'Not Applied',
        row3: 'Interviewed',
    });

    const handleStatusChange = (row, status) => {
        setStatuses(prevStatuses => ({
            ...prevStatuses,
            [row]: status,
        }));
    };

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
        <div className='big-home-container'>    
            <h1>Internship Tracker</h1>
              <div className='table-container'>
                  <table>
                      <thead>
                          {/* Main Header Row */}
                          <tr> 
                              <th> Company </th>
                              <th> Position Title </th>
                              <th> Application Deadline </th>
                              <th> Status </th>
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
                              <td> <DateSelector/> </td>
                              <td> <StatusDropdown/>  </td>
                              <td> <InterviewDropdown/> </td>
                              <td> <DecisionDropdown/> </td>
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