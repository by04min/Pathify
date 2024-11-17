import React from "react"

function RoleInfo() {
    return <div className="role-info-container">
        <label htmlFor="company-name">Company name:</label>
        <input id="company-name" type="text" placeholder="Company name..." />
            
        <label htmlFor="job-title">Job title:</label>
        <input id="job-title" type="text" placeholder="Job title..." />
            
        <label htmlFor="start-date">Start date:</label>
        <input id="start-date" type="date" />
            
        <label htmlFor="end-date">End date:</label>
        <input id="end-date" type="date" />
    </div>
}

export default RoleInfo