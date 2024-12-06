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
            <div className="search-dropdown">
                <button className="search-dropdown-btn" onClick={toggleDropdown}>
                    {selectedStatus}
                </button>
                {isOpen && (
                    <div className="search-dropdown-content">
                        <div className="search-dropdown-item" onClick={() => handleSelect("Industry")}>Industry</div>
                        <div className="search-dropdown-item" onClick={() => handleSelect("Major")}>Major</div>
                    </div>
                )}
            </div>
        );
    }

    const fetchData = async (value) =>{ //to test result display
        if (value.length == 0) {
            setResults([]);
            return;
        } 
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