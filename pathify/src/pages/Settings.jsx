import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { SketchPicker } from 'react-color';

import { AuthContext } from '../components/AuthContext.jsx';
import { editProfile } from '../services/profileServices.js';
import "./Settings.css"

const Settings = ({ toggleTheme, navColor, updateNavColor, resetNavColor }) => {
  const { profile, setProfile, loading } = useContext(AuthContext);
  const [selectedSetting, setSelectedSetting] = useState("display"); // tracks what page the user has clicked on; defaults to display page
  const [toggled, setToggled] = useState(false); // tracks whether user has chosen light mode or dark mode

  const [shareEmail, setShareEmail] = useState(false); // tracks whether user chooses to share their contact (email) with others
  const [shareInternships, setShareInternships] = useState(false); // tracks whether user chooses to share their list of internships with others
  const [showListPreview, setShowListPreview] = useState(false); // tracks whether to show or hide preview of user application list as it would appear on the connections page
  const navigate = useNavigate();

  const [showPrivSaved, setShowPrivSaved] = useState(false);

  // helper function: for user to toggle between light and dark mode
  const clickedToggle = () => { 
    setToggled(!toggled);
    toggleTheme();
  };

  // helper function: for user to accept/decline sharing information with others in Privacy settings
  const handleCheckboxChange = (setter) => (event) => {    
    setter(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedPrivacy = { email: shareEmail, list: shareInternships };
    const updatedProfile = { ...profile, privacy: updatedPrivacy }
    await editProfile(profile.username, profile.major, profile.industry, profile.experiences, updatedPrivacy);
    await setProfile(updatedProfile);

    setShowPrivSaved(true);

    setTimeout(() => {
      setShowPrivSaved(false);
    }, 1500);

    navigate('.');
  }

  const populateData = async () => {
    if (profile) {
      await setShareEmail(profile.privacy.email);
      await setShareInternships(profile.privacy.list);
    }
  }

  useEffect(() => {
    if (!loading && profile) {
      populateData();
    }
  }, [loading, profile])
  const renderSetting = () => {
    // when the user clicks 'Settings' on dropdown navigation, it defaults to the 'display' page
    // users can navigate between different Settings pages using the left sidebar, featuring the 'Display' and 'Privacy' settings page  
    switch (selectedSetting) {
      case "display":
        return (
          <div>
            <h4>Display Settings</h4>
            <h2>Update your display preferences for Pathify</h2>
            <hr className="line" />
            {/*Toggle slider: users can choose between light and dark mode*/}
            <div className="theme-toggle">
              {/*The text to the left of the toggle slider updates based on the user's current display choice*/}
              <label>{toggled ? 'Light Mode' : 'Dark Mode'}</label> 
              <button
                className={`toggle-slider ${toggled ? 'toggled' : ''}`}
                onClick={clickedToggle} 
              >
                <div className="thumb"></div>
              </button>
            </div>
            {/*SketchPicker: dynamic color-choosing UI for users to customize the navigation bar color to their liking*/}
            <h5>Customize the navigation bar color using the color picker below:</h5>
            <SketchPicker
              disableAlpha
              color={navColor}
              onChange={updateNavColor} 
            />
            {/*Resets the navigation bar to default color when clicked*/}
            <button 
              className={`default-nav ${toggled ? 'toggled' : ''}`}
              onClick={resetNavColor}
            > Default Color </button>
          </div>
        );

      case "privacy":
        return (
          <form onSubmit={handleSubmit}>
            <h4>Privacy Settings</h4>
            <h2>Manage what you share on Pathify</h2>
            <hr className="line" />
            {/*Share Email: users can click the checkbox to give permission to share their email with other users that view their profile on the Connections page*/}
            <div className="privacy-option">
              <div className="priv-checkbox-col">
                <input
                  type="checkbox"
                  checked={shareEmail}
                  onChange={handleCheckboxChange(setShareEmail)}
                />
              </div>
              <div className="priv-description-col">
              <div className="label-container">
                <label>Share my e-mail with others</label>
              </div>
                <p>Your UCLA email will be visible to other users who visit your profile through the Connections page.</p>
              </div>
            </div>

            {/*Share Internship List: users can click the checkbox to give permission to share their current applications list with other users that view their profile on the Connections page*/}
            <div className="privacy-option">
              <div className="priv-checkbox-col">
                <input
                  type="checkbox"
                  checked={shareInternships}
                  onChange={handleCheckboxChange(setShareInternships)}
                />
              </div>
              <div className="priv-description-col">
                <div className="label-container">
                  <label>Share my internship application list</label>
                </div>
                <p>Other users will be able to see a list of internships you are currently applying to.<br />Your application status will not be visible at any time.</p>
                {/*Preview Button: hidden by default; users can click to see a preview of what an application list would look like on their profile*/}
                <button
                  className="preview-link"
                  onClick={() => setShowListPreview(!showListPreview)}
                >
                  {showListPreview ? "Hide Preview" : "Show Preview"}
                </button>
                {showListPreview && (
                  <div className="preview-box">
                    <div className='preview-category-title'>Current Internship Applications:</div>
                    <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Company</th>
                          <th>Position</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>ABC Inc</td>
                          <td>XYZ Position</td>
                        </tr>
                        <tr>
                          <td>DEF Ltd</td>
                          <td>XYZ Intern</td>
                        </tr>
                        <tr>
                          <td>GHI and Co</td>
                          <td>XYZ Manager</td>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button className="setting-save-priv">Save</button>
          </form>
        );
    }
  };

  return (
    (loading || !profile) ? <p>Loading...</p> :
      <div className="settings-page">
        <aside className="sidebar">
          <ul>
            <li onClick={() => {setSelectedSetting("display")}}>Display</li>
            <li onClick={() => {setSelectedSetting("privacy")}}>Privacy</li>
          </ul>
        </aside>
        <main className="settings-content">
          {renderSetting()}
          {showPrivSaved && (
            <div className="success-message">
                Changes saved successfully!
            </div>
          )}
        </main>
      </div>  
  );
};

export default Settings;