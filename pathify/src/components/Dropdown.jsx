import React from 'react'

const Dropdown = () => {
    return(
        <div className='flex flex-col'>
            <ul className='flex flex-col gap-4'>
                <li>Profile</li>
                <li>Settings</li>
                <li>Logout</li>
            </ul>
        </div>
    )
}

export default Dropdown