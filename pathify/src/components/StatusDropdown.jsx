import React, { useState } from 'react';
import './StatusDropdown.css';

function StatusDropdown({ initialStatus = "Applied", onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(initialStatus);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (status) => {
        setSelectedStatus(status);
        onChange(status); // Notify parent component of the status change
        setIsOpen(false); // Close dropdown after selection
    };

    return (
        <div className="dropdown">
            <button className="dropdown-btn" onClick={toggleDropdown}>
                {selectedStatus}
            </button>
            {isOpen && (
                <div className="dropdown-content">
                    <div className="dropdown-item" onClick={() => handleSelect("Applied")}>Applied</div>
                    <div className="dropdown-item" onClick={() => handleSelect("Interviewed")}>Interviewed</div>
                    <div className="dropdown-item" onClick={() => handleSelect("Not Applied")}>Not Applied</div>
                </div>
            )}
        </div>
    );
}

export default StatusDropdown;
