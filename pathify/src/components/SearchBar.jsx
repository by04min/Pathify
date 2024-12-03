import React, { useState, useEffect, useRef } from 'react';
import {FaSearch} from 'react-icons/fa';
import { querySearch } from '../services/profileServices';
import "./SearchBar.css";

export const SearchBar = ({setResults}) => {
    const [input, setInput] = useState("");
    const [selectedStatus, setSelectedStatus] = useState('Industry');

    const ColumnDropdown = () => {
        const [isOpen, setIsOpen] = useState(false);
        const dropdownRef = useRef(null);

        useEffect(() => {
            const handleClickOutside = (event) => {
              if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => { document.removeEventListener('mousedown', handleClickOutside); };
          }, []);
    
        const toggleDropdown = () => { setIsOpen(!isOpen); };
    
        const handleSelect = (status) => {
            setSelectedStatus(status);
            setIsOpen(false); // Close dropdown after selection
        };
    
        return (
            <div className="home-dropdown">
                <button className="home-dropdown-btn" onClick={toggleDropdown}>
                    {selectedStatus}
                </button>
                {isOpen && (
                    <div className="home-dropdown-content">
                        <div className="home-dropdown-item" onClick={() => handleSelect("industry")}>Industry</div>
                        <div className="home-dropdown-item" onClick={() => handleSelect("major")}>Major</div>
                    </div>
                )}
            </div>
        );
    }

    const fetchData = async (value) =>{ //to test result display 
        const data = await querySearch(selectedStatus, value);
        console.log('search data is: ', data);
        setResults(data);
    }
    
    const handleChange = (value) => {
        setInput(value)
        fetchData(value);
    }

    return <div className="input-wrapper">
        <FaSearch id="search-icon"/>
        <ColumnDropdown/>
        <input placeholder="Type to search..." value={input} onChange={(e) => handleChange(e.target.value)}/>
    
    
    </div>
};