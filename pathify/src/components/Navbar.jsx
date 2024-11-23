import React, { useContext } from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from './AuthContext.jsx'

const Navbar = ({ navColor }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null); // holds reference to dropdown-content across re-renders
    const { user, logout } = useContext(AuthContext);
    const navigateLogin = useNavigate();
    
    // toggles the visibility of the dropdown when the user clicks the arrow button
    const toggleDropdown = (event) => {
        event.stopPropagation(); // prevents handleOutsideClick function from being triggered when clicking on the dropdown button
        setDropdownOpen(!dropdownOpen);
    };

    // called whenever user clicks on the page (beyond the dropdown button)
    const handleOutsideClick = (event) => {
        // checks whether element clicked is not inside the dropdown menu
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };
    
    // calls logout from AuthContext.jsx to log user out
    const handleLogout = () => {
        logout();
        navigateLogin('/') // returns to default home page
    };

    useEffect(() => {
        // adds event listener for click events on page; whenever a click happens, handleOutsideClick is called
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, []);

    return (
        // receives user-specified background color (from Settings page), or default
        <div style={{ background: navColor }}className='navbar'>
            <div className='nav-links'>
                <Link to='/'>
                    <h1>Pathify</h1> 
                </Link>
            </div>
            <div className='search-box'>
                <input type="text" placeholder='Search'/>
            </div>

            <div className='nav-links'>
                <button 
                    className='navbar-dropdown-button'
                    onClick={toggleDropdown}
                >
                    {dropdownOpen ? '↑' : '↓'}
                </button>

                {dropdownOpen && (
                    <div className='navbar-dropdown-content'
                        ref={dropdownRef}
                    >
                        {user ? (
                            <>
                                <Link to='/profile' onClick={() => setDropdownOpen(false)}>Profile</Link>
                                <Link to='/settings' onClick={() => setDropdownOpen(false)}>Settings</Link>
                                <button onClick={handleLogout} className='navbar-dropdown-logout'>
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <a href="http://localhost:8080/auth/oauth">
                                Sign in to View
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;