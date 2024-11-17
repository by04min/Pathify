import React from "react"

function RoleDescription({ roleDescription, onChange }) {
    return (
        <div className="role-description-container">
            <label htmlFor="role-description">Role description:</label>
            <textarea
                id="role-description"
                type="text"
                placeholder="Role description..."
                value={roleDescription.description}
                onChange={(e) => onChange("description", e.target.value)}
            />

            <label htmlFor="file-upload">Upload attachments:</label>
            <gap />
            <input
                id="file-upload"
                type="file"
                multiple
                onChange={(e) => onChange("attachments", Array.from(e.target.files))}
            />
        </div>
    )
}

export default RoleDescription;