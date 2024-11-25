import React, { useState } from 'react';
import './Dropdown.css';

// StatusDropdown Component
export function StatusDropdown({ initialStatus = "Applied", onChange }) {
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
        <div className="home-dropdown">
            <button className="home-dropdown-btn" onClick={toggleDropdown}>
                {selectedStatus}
            </button>
            {isOpen && (
                <div className="home-dropdown-content">
                    <div className="home-dropdown-item" onClick={() => handleSelect("Applied")}>Applied</div>
                    <div className="home-dropdown-item" onClick={() => handleSelect("Interviewed")}>Interviewed</div>
                    <div className="home-dropdown-item" onClick={() => handleSelect("Not Applied")}>Not Applied</div>
                </div>
            )}
        </div>
    );
}

// InterviewDropdown Component
export function InterviewDropdown({ initialStatus = "Pending", onChange }) {
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
        <div className="home-dropdown">
            <button className="home-dropdown-btn" onClick={toggleDropdown}>
                {selectedStatus}
            </button>
            {isOpen && (
                <div className="home-dropdown-content">
                    <div className="home-dropdown-item" onClick={() => handleSelect("Pending")}>Pending</div>
                    <div className="home-dropdown-item" onClick={() => handleSelect("Scheduled")}>Scheduled</div>
                    <div className="home-dropdown-item" onClick={() => handleSelect("Completed")}>Completed</div>
                </div>
            )}
        </div>
    );
}

// DecisionDropdown Component
export function DecisionDropdown({ initialStatus = "Pending", onChange }) {
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
        <div className="home-dropdown">
            <button className="home-dropdown-btn" onClick={toggleDropdown}>
                {selectedStatus}
            </button>
            {isOpen && (
                <div className="home-dropdown-content">
                    <div className="home-dropdown-item" onClick={() => handleSelect("Pending")}>Pending</div>
                    <div className="home-dropdown-item" onClick={() => handleSelect("Rejected")}>Rejected</div>
                    <div className="home-dropdown-item" onClick={() => handleSelect("Received Offer")}>Receive Offer</div>
                    <div className="home-dropdown-item" onClick={() => handleSelect("Offer Accepted")}>Offer Accepted</div>
                </div>
            )}
        </div>
    );
}