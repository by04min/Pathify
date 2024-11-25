import React from "react"

function Reflection({ reflection, onChange }) {
    return (
        <div className="reflection-container">
            <label htmlFor="reflection">Reflection:</label>
            <textarea
                id="reflection"
                placeholder="Reflection..."
                value={reflection}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

export default Reflection;