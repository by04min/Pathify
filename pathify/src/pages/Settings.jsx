import React, {useState} from 'react'
import { SketchPicker } from 'react-color';
import "../components/Settings.css"

const Settings = ({ toggleTheme, navColor, updateNavColor, resetNavColor }) => {
    const [selectedSetting, setSelectedSetting] = useState("display"); // tracks what page the user has clicked on; defaults to display page
    const [toggled, setToggled] = useState(false); // tracks whether user has chosen light mode or dark mode

    const [shareEmail, setShareEmail] = useState(false); // tracks whether user chooses to share their contact (email) with others
    const [shareInternships, setShareInternships] = useState(false); // tracks whether user chooses to share their list of internships with others
    const [showListPreview, setShowListPreview] = useState(false); // tracks whether to show or hide preview of user application list as it would appear on the connections page

    const clickedToggle = () => {
        setToggled(!toggled);
        toggleTheme();
    };

    const handleCheckboxChange = (setter) => (event) => {
        setter(event.target.checked);
    };

    const renderSetting = () => {
        switch (selectedSetting) {
            case "display":
                return (
                    <div>
                        <h4>Display Settings</h4>
                        <h2>Update your display preferences for Pathify</h2>
                        <hr className="line" />
                        <div className="theme-toggle">
                            <label>{toggled ? 'Light Mode' : 'Dark Mode'}</label> 
                            <button
                                className={`toggle-slider ${toggled ? 'toggled' : ''}`}
                                onClick={clickedToggle} 
                            >
                                <div className="thumb"></div>
                            </button>
                        </div>
                        <h5>Customize the navigation bar color using the color picker below:</h5>
                        <SketchPicker
                            disableAlpha
                            color={navColor}
                            onChange={updateNavColor} 
                        />
                        <button 
                            className={`default-nav ${toggled ? 'toggled' : ''}`}
                            onClick={resetNavColor}
                        >
                            Default Color
                        </button>
                    </div>
                );

            case "privacy":
                return (
                    <div>
                        <h4>Privacy Settings</h4>
                        <h2>Manage what you share on Pathify</h2>
                        <hr className="line" />
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
                                <button
                                    className="preview-link"
                                    onClick={() => setShowListPreview(!showListPreview)}
                                >
                                    {showListPreview ? "Hide Preview" : "Show Preview"}
                                </button>
                                {showListPreview && (
                                    <div className="preview-box">
                                        <h5>Current Internship Applications:</h5>
                                        <ul>
                                            <li>ABC Internship Position, at XYZ Inc</li>
                                            <li>ABC Summer Internship, at XYZ Ltd</li>
                                            <li>ABC Position Application, at XYZ</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="settings-page">
            <aside className="sidebar">
                <ul>
                    <li onClick={() => setSelectedSetting("display")}>Display</li>
                    <li onClick={() => setSelectedSetting("privacy")}>Privacy</li>
                </ul>
            </aside>
            <main className="settings-content">
                {renderSetting()}
            </main>
        </div>

    );
};

export default Settings;