import "react";

function RoleDescription({ roleDescription, onChange }) {
    return (
        <div className="role-description-container">
            <label htmlFor="role-description">Role description:</label>
            <textarea
                id="role-description"
                type="text"
                placeholder="Role description..."
                value={roleDescription}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

export default RoleDescription;