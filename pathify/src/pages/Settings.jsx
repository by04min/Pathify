import React, {useState} from 'react'
import { SketchPicker } from 'react-color';
import "../components/Settings.css"

const Settings = ({ toggleTheme, navColor, updateNavColor, resetNavColor }) => {
    const [selectedSetting, setSelectedSetting] = useState("display"); // tracks what page the user has clicked on; defaults to display page
    const [toggled, setToggled] = useState(false); // tracks whether user has chosen light mode or dark mode

    const clickedToggle = () => {
        setToggled(!toggled);
        toggleTheme();
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
                return <div>Privacy Settings</div>
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