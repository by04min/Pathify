import React, {useState} from 'react'
import "../components/Settings.css"

const Settings = () => {
    const [selectedSetting, setSelectedSetting] = useState("privacy");

    const renderSetting = () => {
        switch (selectedSetting) {
            case "privacy":
                return <div>Privacy Settings</div>
            case "light/dark mode":
                return <div>Light and Dark Mode</div>
            default:
                return <div>Select a setting!</div>
        }
    };

    return (
        <div className="settings-page">
            <aside className="sidebar">
                <ul>
                    <li onClick={() => setSelectedSetting("privacy")}>Privacy</li>
                    <li onClick={() => setSelectedSetting("light/dark mode")}>Light and Dark Mode</li>
                </ul>
            </aside>
            <main className="settings-content">
                {renderSetting()}
            </main>
        </div>

    );
};

export default Settings;