import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext.jsx';
import { addRow } from '../services/sheetServices.js';

const longMonths = new Set([1, 3, 5, 7, 8, 10, 12]);
const shortMonths = new Set([4, 6, 9, 11]);
const isDigit = (char) => /\d/.test(char);

const leapYear = (year) => {
  if (year % 4 == 0) {
    if (year % 100 == 0)
      return year % 400 == 0;
    return true;
  }
  return false;
}

const checkValid = (month, day, year) => {
  if (month < 1 || month > 12 || day < 1 || day > 31) return false;

  if (month == 2)
    return (leapYear(year)) ? (day <= 29) : (day <= 28);
  else if (longMonths.has(month))
    return day <= 31;
  else if (shortMonths.has(month))
    return day <= 30;
}

const checkDate = (str) => {
  str = str.replace(/\s/g,'');
  if (str.length != 10) return false;
  for (let i = 0 ; i < str.length ; i++) {
    switch(i){
      case 2:
      case 5:
        if (str[i] != '/') return false;
        break;
      default:
        if (!isDigit(str[i])) return false;
    }
  }

  const [month, day, year] = str.split('/').map(Number);
  return checkValid(month, day, year);
}

const dateForSQL = (str) => {
  const [month, day, year] = str.split('/');
  return `${year}-${month}-${day}`;
}

const RowForm = () => {
  const [empty, setEmpty] = useState(false);  
  const [dateFormat, setDateFormat] = useState(false);
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [deadline, setDeadline] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    await setEmpty(false);
    await setDateFormat(false);
    
    event.preventDefault();
    console.log('event is: ', company, position, deadline);
    if (company == '' || position == '' || deadline == '') {
      setEmpty(true);
      return;
    } else if (!checkDate(deadline)) {
      setDateFormat(true);
      return;
    }

    await addRow(company, position, dateForSQL(deadline));    
    navigate('/');
  }
  return (
    <div>
      {/* Form for submitting jobs */}
      <h3 className="home-form-title"> Add New Job Listing </h3>
      <div className='home-form-container'>
        <form className='home-form' onSubmit={() => handleSubmit()}>
          <label className='home-form-label' htmlFor='company-name'> Company Name </label>
          <input className='home-form-input' type="text"  name="company-name" placeholder="Company Name" 
            onChange={(e) => { setCompany(e.target.value); }} value={company}/>

          <label className='home-form-label' htmlFor='position-title'> Position Title </label>
          <input className='home-form-input' type="text" name="position-title" placeholder="Position Title" 
            onChange={(e) => { setPosition(e.target.value); }} value={position}/>

          <label className='home-form-label' htmlFor='application-deadline'> Application Deadline </label>
          <input className='home-form-input' type="text" name="application-deadline" placeholder="Application Deadline: MM/DD/YYYY"
            onChange={(e) => { setDeadline(e.target.value); }} value={deadline}/>
          
          {
          empty ? (<h5 className="form-error-message">Do not leave rows empty</h5>) : dateFormat ? (<h5 className="form-error-message">Please enter valid date in MM/DD/YYYY format</h5>) : (<></>)
          }

          <button className="home-form-buttons" type="submit"> Submit </button>
        </form>
      </div>
    </div>
  );
}

export default RowForm;