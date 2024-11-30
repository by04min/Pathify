import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { StatusDropdown, InterviewDropdown, DecisionDropdown } from  "../components/Dropdown";
import DateSelector from '../components/DateSelector';
import { AuthContext } from '../components/AuthContext.jsx';
import { getSheet } from '../services/sheetServices.js';

function Home() {
  const { user } = useContext(AuthContext);
  const [sheet, setSheet] = useState([]);
  const navigate = useNavigate();
  
  const fetchSheet = async() => {
    const sheetData = await getSheet();
    await setSheet(sheetData);
  }

  useEffect(() => {
    fetchSheet();
  }, []);

  return(
    <div>
      <div className='big-home-container'>    
        <h1 className='title'>Internship Tracker</h1>
        <div>
        {/* Table Tracker */}        
        <button onClick={ () => navigate('/newform')}>+</button>
        <div className='table-container'>
          <table>
            <thead>
              {/* Main Header Row */}
              <tr> 
                <th> Company </th>
                <th> Position Title </th>
                <th> Application Deadline </th>
                <th> Status </th>
                <th> Interview </th>
                <th> Decision </th>
              </tr>
            </thead>
            {/* tbody contains our data with jobs people applied to etc.  */}
            <tbody>
              {sheet.map((row) => {
                return (
                  <tr key={row.id}>
                    <td>{row.company}</td>
                    <td>{row.position}</td>
                    <td>{<DateSelector initialDate={row.deadline} tableid={row.id}/>}</td>
                    <td>{<StatusDropdown initialStatus={row.status} tableid={row.id}/>}</td>
                    <td>{<InterviewDropdown initialStatus={row.interview} tableid={row.id}/>}</td>
                    <td>{<DecisionDropdown initialStatus={row.decision} tableid={row.id}/>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div> 

          {/* Form for submitting jobs */}
          {/* <h3 className="home-form-title"> Add New Job Listing </h3>
          <div className='home-form-container'>
            <form className='home-form'>
              <label className='home-form-label' htmlFor='company-name'> Company Name* </label>
              <input className='home-form-input' type="text" placeholder="Enter Company Name" name="company-name"></input>

              <label className='home-form-label' htmlFor='position-title'> Position Title* </label>
              <input className='home-form-input' type="text" placeholder="Enter Position Title" name="position-title" ></input>

              <label className='home-form-label' htmlFor='application-deadline'> Application Title* </label>
              <input className='home-form-input' type="text" placeholder="Enter Application Deadline" name="application-deadline" ></input>
              
              <button className="home-form-buttons" type="submit"> Submit </button>
            </form>
          </div> */}

        </div>
      </div>
    </div>
  );
}

export default Home;