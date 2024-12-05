import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { searchOther } from '../services/profileServices.js';
import { getOtherSheet } from '../services/sheetServices.js';
import "./Profile.css"

const OtherProfile = () => {
  const { username } = useParams();
  const [otherProfile, setOtherProfile] = useState({});
  const [spreadsheet, setSpreadsheet] = useState([]);

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

  return (
    <div>
      <h1>{username}</h1>
      {Object.keys(otherProfile).length > 0 ? (
        <div>
          <h2>Email: {otherProfile.privacy.email ? otherProfile.email : 'not listed'}</h2>
          <h3>Industry: {otherProfile.industry ? otherProfile.industry : 'N/A'}</h3>
          <h3>Major: {otherProfile.major ? otherProfile.major : 'N/A'}</h3>
          { otherProfile.experiences.map((row, index) => {
            return (
              <div key={index}>
                <h4>Company: {row.company}</h4>
                <h4>Job Title: {row.job}</h4>                
                <h4>Time period: {formatDate(row.start)} - {formatDate(row.end)}</h4>
                <h4>Job Description: {row.description}</h4>
                <h4>Reflection: {row.reflection}</h4>
              </div>
            )}) }
          { otherProfile.privacy.list ? (
            <>
              <h3>Internships</h3>
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
            </> ) : <></>
          }
        </div>
      ) : (<div> Loading... </div>)}
    </div>);
};

export default OtherProfile;