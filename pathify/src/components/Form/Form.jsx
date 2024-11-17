import React, { useState } from "react";
import RoleInfo from "./RoleInfo";
import RoleDescription from "./RoleDescription";
import Reflection from "./Reflection";
import "./Form.css";

function Form() {
    const [page, setPage] = useState(0)
    const FormTitles = ["Role Info", "Role Description", "Reflection"]

    // Use states for input fields
    const [roleInfo, setRoleInfo] = useState({
        companyName: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
    })
    const [roleDescription, setRoleDescription] = useState({
        description: "",
        attachments: [],
    })
    const [reflection, setReflection] = useState("");

    // Check if input fields are filled in
    const [completionStatus, setCompletionStatus] = useState([false, false, false])
    const handleRoleInfoChange = (field, value) => {
        const updatedRoleInfo = { ...roleInfo, [field]: value }
        setRoleInfo(updatedRoleInfo)

        const isComplete = Object.values(updatedRoleInfo).every((v) => v.trim() !== "")
        handleCompletionUpdate(0, isComplete)
    }
    const handleRoleDescriptionChange = (field, value) => {
        const updatedRoleDescription = { ...roleDescription, [field]: value }
        setRoleDescription(updatedRoleDescription)

        const isComplete = updatedRoleDescription.description.trim() !== ""
        handleCompletionUpdate(1, isComplete)
    }
    const handleReflectionChange = (value) => {
        setReflection(value);

        const isComplete = value.trim() !== "";
        handleCompletionUpdate(2, isComplete);
    }    
    const handleCompletionUpdate = (index, status) => {
        const updatedStatus = [...completionStatus]
        updatedStatus[index] = status;
        setCompletionStatus(updatedStatus)
    }

    // Display the correct page
    const PageDisplay = () => {
        if (page === 0) {
            return <RoleInfo roleInfo={roleInfo} onChange={handleRoleInfoChange} />;
        } else if (page === 1) {
            return <RoleDescription roleDescription={roleDescription} onChange={handleRoleDescriptionChange} />
        } else {
            return <Reflection reflection={reflection} onChange={handleReflectionChange} />
        }
    }

    // Check if all input fields are filled in
    const isFormComplete = completionStatus.every((status) => status);
    const handleSubmit = () => {
        if (isFormComplete) {
            console.log("Form submitted!", { roleInfo, roleDescription, reflection });
            alert("Form submitted successfully!");
        }
    };

    return (
        <div className="form">
            <div className="form-container">
                <div className="header">
                    <h1>{FormTitles[page]}</h1>
                </div>
                <div className="body">{PageDisplay()}</div>
                <div className="footer">
                    {FormTitles.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setPage(idx)}
                            className={completionStatus[idx] ? "completed" : "incomplete"}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
                <div className="submit-section">
                    <button
                        onClick={handleSubmit}
                        className={isFormComplete ? "submit-active" : "submit-inactive"}
                        disabled={!isFormComplete}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Form;