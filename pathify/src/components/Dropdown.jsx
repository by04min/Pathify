import React, { useState, useEffect, useRef } from 'react';
import { updateSheet } from '../services/sheetServices.js';
import './Dropdown.css';

// StatusDropdown Component
export function StatusDropdown({ initialStatus, tableid }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(initialStatus);
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target))
            setIsOpen(false);
        };
        // Attach event listener on mount
        document.addEventListener('mousedown', handleClickOutside);
        // Clean up the event listener on unmount
        return () => { document.removeEventListener('mousedown', handleClickOutside); };
      }, []);

    const toggleDropdown = () => { setIsOpen(!isOpen); };

    const handleSelect = (status) => {
        setSelectedStatus(status);
        updateSheet('status', status, tableid);
        setIsOpen(false); // Close dropdown after selection
    };

    return (
        <div className="home-dropdown">
            <button className="home-dropdown-btn" onClick={toggleDropdown}>
                {selectedStatus}
            </button>
            {isOpen && (
                <div ref={dropdownRef} className="home-dropdown-content">
                    <div className="home-dropdown-item" onClick={() => handleSelect("Not Applied")}>Not Applied</div>
                    <div className="home-dropdown-item" onClick={() => handleSelect("Applied")}>Applied</div>
                    <div className="home-dropdown-item" onClick={() => handleSelect("Interviewed")}>Interviewed</div>
                </div>
            )}
        </div>
    );
}

// InterviewDropdown Component
export function InterviewDropdown({ initialStatus, tableid }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(initialStatus);
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target))
            setIsOpen(false);
        };
        // Attach event listener on mount
        document.addEventListener('mousedown', handleClickOutside);
        // Clean up the event listener on unmount
        return () => { document.removeEventListener('mousedown', handleClickOutside); };
      }, []);
      
    const toggleDropdown = () => { setIsOpen(!isOpen); };

    const handleSelect = (status) => {
        setSelectedStatus(status);
        updateSheet('interview', status, tableid);
        setIsOpen(false); // Close dropdown after selection
    };

    return (
        <div className="home-dropdown">
            <button className="home-dropdown-btn" onClick={toggleDropdown}>
                {selectedStatus}
            </button>
            {isOpen && (
                <div ref={dropdownRef} className="home-dropdown-content">
                    <div className="home-dropdown-item" onClick={() => handleSelect("Pending")}>Pending</div>
                    <div className="home-dropdown-item" onClick={() => handleSelect("Scheduled")}>Scheduled</div>
                    <div className="home-dropdown-item" onClick={() => handleSelect("Completed")}>Completed</div>
                </div>
            )}
        </div>
    );
}

// DecisionDropdown Component
export function DecisionDropdown({ initialStatus, tableid }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(initialStatus);
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target))
            setIsOpen(false);
        };
        // Attach event listener on mount
        document.addEventListener('mousedown', handleClickOutside);
        // Clean up the event listener on unmount
        return () => { document.removeEventListener('mousedown', handleClickOutside); };
      }, []);

    const toggleDropdown = () => { setIsOpen(!isOpen); };

    const handleSelect = (status) => {
        setSelectedStatus(status);
        updateSheet('decision', status, tableid);
        setIsOpen(false); // Close dropdown after selection
    };

    return (
        <div className="home-dropdown">
            <button className="home-dropdown-btn" onClick={toggleDropdown}>
                {selectedStatus}
            </button>
            {isOpen && (
                <div ref={dropdownRef} className="home-dropdown-content">
                    <div className="home-dropdown-item" onClick={() => handleSelect("Pending")}>Pending</div>
                    <div className="home-dropdown-item" onClick={() => handleSelect("Rejected")}>Rejected</div>
                    <div className="home-dropdown-item" onClick={() => handleSelect("Received Offer")}>Receive Offer</div>
                    <div className="home-dropdown-item" onClick={() => handleSelect("Offer Accepted")}>Offer Accepted</div>
                </div>
            )}
        </div>
    );
}