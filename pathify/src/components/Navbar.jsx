import React, { useContext } from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from './AuthContext.jsx'

const Navbar = ({ navColor }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null); // holds reference to dropdown-content across re-renders

    const { user, logout } = useContext(AuthContext); // props passed from AuthContext; check for whether user is logged in, and sign out functionality
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
            setDropdownOpen(false); // hide dropdown menu when user clicks outside of it
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

            {/* Dropdown button: when a user clicks the dropdown, they can then navigate to 'Profile', 'Settings', or Sign Out */}
            <div className='nav-links'>
                <button 
                    className='navbar-dropdown-button'
                    onClick={toggleDropdown}
                >
                    {/* the dropdown button's design changes based on whether it is open or not */}
                    {dropdownOpen ? '↑' : '↓'}
                </button>

                {dropdownOpen && (
                    <div className='navbar-dropdown-content'
                        ref={dropdownRef}
                    >
                        {/* users can only navigate the Profile, Settings, or Sign Out when they are signed into Pathify */}
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