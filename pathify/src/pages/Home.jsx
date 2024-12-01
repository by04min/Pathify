import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { StatusDropdown, InterviewDropdown, DecisionDropdown } from  "../components/Dropdown";
import DateSelector from '../components/DateSelector';
import { AuthContext } from '../components/AuthContext.jsx';
import { getSheet, deleteRow } from '../services/sheetServices.js';


function Home() {
    const [showDefStatic, setShowDefStatic] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowDefStatic(true), 1500);
        return () => clearTimeout(timer);
    }, []);

  const { user } = useContext(AuthContext);
  const [sheet, setSheet] = useState([]);
  const [invisible, setInvisible] = useState(new Set());
  const navigate = useNavigate();
  
  const fetchSheet = async() => {
    const sheetData = await getSheet();
    await setSheet(sheetData);
  }

  useEffect(() => {
    fetchSheet();
  }, []);

  const DeleteButton = ({tableid, className}) => {
    const handleClick = () => {
      if (confirm("Are you sure you want to delete this internship?")) {
        setInvisible(prevSet => new Set(prevSet.add(tableid)));
        deleteRow(tableid);
      }
    }
    return(<button onClick={()=> handleClick()} className={className}>X</button>);
  }

  return(
    <div>
      {!user ? (
        <div className={"default-welcome"}>
            <h1 className={showDefStatic ? "static-default" : "typing-animation"}>Welcome to Pathify</h1>
            <p>Sign in with your UCLA e-mail to begin your jouney.</p>
            <button onClick={() => window.location.href = 'http://localhost:8080/auth/oauth'} className="login-button">
              Sign In
            </button>
        </div>
      ) : (
      <div className='big-home-container'>    
        <h1 className='title'>Internship Tracker</h1>
        <div>
          {/* Table Tracker */}        
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
                  if (invisible.has(row.id)) return null;
                  return (
                    <tr key={row.id}>
                      <td> <DeleteButton tableid={row.id} className="delete-internship"/> {row.company}</td>
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
            <button onClick={ () => navigate('/newform')} className="add-internship">Add Internship</button>
          </div> 
        </div>
      </div>
      )}
    </div>
  );
}

export default Home;