import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import userIcon from '../assets/user.svg';

const Navbar = ({ navColor }) => {
    return (
        <div style={{ background: navColor }}className='navbar'>
            <div className='nav-links'>
                <Link to='/'>
                    <h1>Pathify</h1>
                </Link>
            </div>
            <div className='search-box'>
                <input type="text" placeholder='Search'/>
            </div>
            <div></div>
            <div className='nav-links'>
                <Link to='/profile'>Profile</Link>
            </div>
            <div className='nav-links'>
                <Link to='/settings'>Settings</Link>
            </div>
        </div>
    );
};

export default Navbar;