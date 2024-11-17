import React from "react"

function RoleInfo({ roleInfo, onChange }) {
    return (
        <div className="role-info-container">
            <label htmlFor="company-name">Company name:</label>
            <input
                id="company-name"
                type="text"
                placeholder="Company name..."
                value={roleInfo.companyName}
                onChange={(e) => onChange("companyName", e.target.value)}
            />

            <label htmlFor="job-title">Job title:</label>
            <input
                id="job-title"
                type="text"
                placeholder="Job title..."
                value={roleInfo.jobTitle}
                onChange={(e) => onChange("jobTitle", e.target.value)}
            />

            <label htmlFor="start-date">Start date:</label>
            <input
                id="start-date"
                type="date"
                value={roleInfo.startDate}
                onChange={(e) => onChange("startDate", e.target.value)}
            />

            <label htmlFor="end-date">End date:</label>
            <input
                id="end-date"
                type="date"
                value={roleInfo.endDate}
                onChange={(e) => onChange("endDate", e.target.value)}
            />
        </div>
    );
}

export default RoleInfo;