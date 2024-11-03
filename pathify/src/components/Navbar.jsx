import React from 'react'
import './Navbar.css'

const Navbar = () => {
    return(
        <div className= 'navbar'>
            <h1>NavBar</h1>
            <div className='search-box'>
                <input type="text" placeholder='Search'/>
            </div>

        </div>
    );
}

export default Navbar;