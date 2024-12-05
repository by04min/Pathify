import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { searchOther } from '../services/profileServices.js';
import { useNavigate } from 'react-router-dom';
import { getOtherSheet } from '../services/sheetServices.js';
import "./Profile.css"
import "./OtherProfile.css"

const OtherProfile = () => {
  const { username } = useParams();
  const [otherProfile, setOtherProfile] = useState({});
  const [spreadsheet, setSpreadsheet] = useState([]);

  const navigate = useNavigate();
  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return (`${month}/${day}/${year}`);
  }

  const populateData = async () => {
    const data = await searchOther(username);
    const sheet = await getOtherSheet(data[0].email);
    console.log('other profile is: ', data[0], 'spreadsheet is: ', sheet);
    await setOtherProfile(data[0]);
    await setSpreadsheet(sheet);
  }

  useEffect(() => {
    populateData();
  }, [])

  const handleBack = () => { navigate('/connection'); }

  return (
    <div>
      <h1 className='username-header'>{username}</h1>
      {Object.keys(otherProfile).length > 0 ? (
        <div>
          <div className='personal-info-container'>
            <p><strong>Email: </strong>{otherProfile.privacy.email ? otherProfile.email : 'not listed'}</p>
            <p><strong>Industry: </strong>{otherProfile.industry ? otherProfile.industry : 'N/A'}</p>
            <p><strong>Major: </strong>{otherProfile.major ? otherProfile.major : 'N/A'}</p>
          </div>
          {/* <div className='category-title'> Experiences: </div> */}
          <div className='category-title'>
            {otherProfile.experiences && otherProfile.experiences.length > 0 && 'Experiences:'}
          </div>
          { otherProfile.experiences.map((row, index) => {
            return (
              <div key={index} className='other-experience-container'>

                <h4> Experience: #{index+1} </h4>

                <div className='experience-container-content-grid-container'>
                  <div>
                    <span className='experience-container-titles'>Company:</span>
                    <span>{row.company}</span>
                  </div>
                  <div>
                    <span className='experience-container-titles'>Job Title:</span>
                    <span> {row.job} </span>
                  </div>
                  <div>
                    <span className='experience-container-titles'>Time period:</span>
                    <span> {formatDate(row.start)} - {formatDate(row.end)} </span>
                  </div>
                </div> 

                <div className='experience-content-items'>
                  <span className='experience-container-titles'>Job Description:</span>
                  <span> {row.description} </span>
                </div>
                <div className='experience-content-items'>
                  <span className='experience-container-titles'>Job Reflection:</span>
                  <span>  {row.reflection} </span>
                </div>

              </div> //outermost of exeperience-container
            )}) }
          { otherProfile.privacy.list ? (
            <>
            <div className='category-title'>Current Internship Applications:</div>
              <div className='profile-table-spacing'> 
                <div className='table-container'>
                <table>
                  <thead>
                    <tr>
                      <th>Company Title</th>
                      <th>Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(spreadsheet.map((row, index) => {
                      console.log('row is: ', row);
                      return (
                        <tr key={index}>
                          <td>{row.company}</td>
                          <td>{row.position}</td>
                        </tr>
                      )}))}
                  </tbody>
                </table>
                </div>
              </div>
            </> ) : <></>
          }
        </div>
      ) : (<div> Loading... </div>)}
      <button className='back-to-connect' onClick={handleBack}>Back</button>
    </div>);
};

export default OtherProfile;