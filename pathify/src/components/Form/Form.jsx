import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { addNewExp } from '../../services/profileServices';
import RoleInfo from "./RoleInfo";
import RoleDescription from "./RoleDescription";
import Reflection from "./Reflection";
import "./Form.css";

function Form() {
  const FormTitles = ["Role Info", "Role Description", "Reflection"];
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  // Use states for input fields
  const [roleInfo, setRoleInfo] = useState({
    companyName: "", jobTitle: "", startDate: "", endDate: "",
  });
  const [roleDescription, setRoleDescription] = useState("");
  const [reflection, setReflection] = useState("");

  // Error message state
  const [roleInfoError, setRoleInfoError] = useState(null);

  // Check if input fields are filled in
  const [completionStatus, setCompletionStatus] = useState([false, false, false]);

  const handleRoleInfoChange = (field, value) => {
    const updatedRoleInfo = { ...roleInfo, [field]: value };
    setRoleInfo(updatedRoleInfo);

    const validDates = validateDates(updatedRoleInfo);

    const isComplete = Object.values(updatedRoleInfo).every((v) => v.trim() !== "");
    handleCompletionUpdate(0, isComplete && validDates);
  }

  const validateDates = (roleInfo) => {
    const startDateLimit = new Date('1950-01-01')
    const start = new Date(roleInfo.startDate);
    const end = new Date(roleInfo.endDate);

    const currentDate = new Date();
    const maxEndDate = new Date();
    maxEndDate.setFullYear(currentDate.getFullYear() + 10);

    if (start && start < startDateLimit) {
        setRoleInfoError("Start date cannot be earlier than 01/01/1950.");
        return false;
    }

    if (end && start && end < start) {
        setRoleInfoError("End date must be later than the start date.");
        return false;
    }

    if (end && end > maxEndDate) {
      setRoleInfoError("End date must be no later than 10 years from the current date.");
      return false;
    }

    setRoleInfoError(null);
    return true;
};

  const handleRoleDescriptionChange = (value) => {
    setRoleDescription(value);

    const isComplete = value.trim() !== "";
    handleCompletionUpdate(1, isComplete);
  }
  const handleReflectionChange = (value) => {
    setReflection(value);

    const isComplete = value.trim() !== "";
    handleCompletionUpdate(2, isComplete);
  }    
  const handleCompletionUpdate = (index, status) => {
    const updatedStatus = [...completionStatus];
    updatedStatus[index] = status;
    setCompletionStatus(updatedStatus);
  }

  // Display the correct page
  const PageDisplay = () => {
    if (page === 0) {
      return <RoleInfo roleInfo={roleInfo} onChange={handleRoleInfoChange} error={roleInfoError} setError={setRoleInfoError} validateDates={validateDates}/>;
    } else if (page === 1) {
      return <RoleDescription roleDescription={roleDescription} onChange={handleRoleDescriptionChange} />;
    } else {
      return <Reflection reflection={reflection} onChange={handleReflectionChange} />;
    }
  }

  // Check if all input fields are filled in
  const isFormComplete = completionStatus.every((status) => status);

  const handleSubmit = async () => {
    if (isFormComplete) {
      console.log("Form submitted!", { roleInfo, roleDescription, reflection });
      const expObj = {
        company: roleInfo.companyName,
        job: roleInfo.jobTitle,
        start: roleInfo.startDate,
        end: roleInfo.endDate,
        description: roleDescription,
        reflection: reflection
      }

      const exp = await addNewExp(expObj);
      console.log(exp);
      navigate('/profile');
    }
  };

  const handleCancel = () => { navigate('/profile'); }

  return (
    <div className="form">
      <div className="form-container">
        <div className="header">
          <h1 className="form-title">{FormTitles[page]}</h1>
        </div>
        <div className="body">{PageDisplay()}</div>
        <div className="footer">
          {FormTitles.map((_, idx) => (
            <button
                key={idx}
                onClick={() => setPage(idx)}
                className={completionStatus[idx] ? "completed" : "incomplete"}
            > {idx + 1} </button>
          ))}
        </div>
        <div className="submit-section">
          <button onClick={handleCancel} className="cancel-button">Cancel</button>
          <button
              onClick={handleSubmit}
              className={isFormComplete ? "submit-active" : "submit-inactive"}
              disabled={!isFormComplete}
          > Submit </button>
        </div>
      </div>
    </div>
  )
}

export default Form;