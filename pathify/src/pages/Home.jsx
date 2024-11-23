
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import StatusDropdown from  "../components/StatusDropdown";


function Home() {

    // const navigate = useNavigate();
    const navigate = useNavigate(); 

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
                            <td> November 2024 </td>
                            <td> <StatusDropdown/>  </td>
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
        </div>
    )
}

export default Home;