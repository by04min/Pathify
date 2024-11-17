import React from "react"

function RoleDescription() {
    return <div className="role-description-container">
        <label htmlFor="role-description">Role description:</label>
        <textarea id="role-description" type="text" placeholder="Role description..." />
            
        <label htmlFor="file-upload">Upload attachments:</label>
        <gap />
        <input id="file-upload" type="file" />
    </div>
}

export default RoleDescription