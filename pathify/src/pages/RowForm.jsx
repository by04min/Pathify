import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext.jsx';
import { addRow } from '../services/sheetServices.js';

const validDate = (deadline) => {
  const userDate = new Date(deadline);
  const minDate = new Date('01-01-2020');
  return userDate >= minDate;
}

const RowForm = () => {
  const [empty, setEmpty] = useState(false);  
  const [dateError, setDateError] = useState(null);
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [deadline, setDeadline] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    setEmpty(false);
    setDateError(null);

    event.preventDefault();
    console.log('event is: ', company, position, deadline);
    if (company == '' || position == '' || deadline == '') {
      setEmpty(true);
      return;
    } else if (!validDate(deadline)) {
      setDateError("Deadline must be later than 01/01/2020");
      return;
    }

    await addRow(company, position, deadline);    
    navigate('/');
  }

  const handleCancel = () => { navigate('/'); }

  return (
    <div>
      {/* Form for submitting jobs */}
      <h3 className="home-form-title"> Add New Job Listing </h3>
      <div className='home-form-container'>
        <form className='home-form' onSubmit={handleSubmit}>
          <label className='home-form-label' htmlFor='company-name'> Company Name </label>
          <input className='home-form-input' type="text"  name="company-name" placeholder="Company Name" 
            onChange={(e) => { setCompany(e.target.value); }} value={company}/>

          <label className='home-form-label' htmlFor='position-title'> Position Title </label>
          <input className='home-form-input' type="text" name="position-title" placeholder="Position Title" 
            onChange={(e) => { setPosition(e.target.value); }} value={position}/>

          <label className='home-form-label' htmlFor='application-deadline'> Application Deadline </label>
          <input className='home-form-input' type="date" name="application-deadline" placeholder="Application Deadline: MM/DD/YYYY"
            onChange={(e) => { setDeadline(e.target.value); }} value={deadline}/>
          
          {
          empty ? (<h5 className="form-error-message">Do not leave rows empty</h5>) : dateError ? (<h5 className="form-error-message">{dateError}</h5>) : (<></>)
          }
          
          <div className="profile-buttons">
          <button className="home-form-buttons" onClick={(e) => {
            e.preventDefault();
            handleCancel();
          }}> Cancel </button>
          <button className="home-form-buttons" type="submit"> Submit </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RowForm;