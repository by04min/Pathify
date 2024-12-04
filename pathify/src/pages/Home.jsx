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

  const forClick = async (column, search) => {
    // const encodedColumn = encodeURIComponent(column);
    // const encodedSearch = encodeURIComponent(search);

    // try {
    //   const response = await fetch(`http://localhost:8080/search/query?column=${encodedColumn}&search=${encodedSearch}`, { credentials: 'include', });
      
    //   if (!response.ok) { throw new Error('Failed to get query'); }
    //   return response.json();
    // } catch (err) { console.log(err); }
    navigate(`/${'Jimin Kim'}`);
  }
  
   const sortByDate = () => {
        const sortedSheet = [...sheet].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        setSheet(sortedSheet);
    };

    return(
      <div>
        {!user ? (
          <div className={"default-welcome"}>
              <h1 className={showDefStatic ? "static-default" : "typing-animation"}>Welcome to Pathify</h1>
              <p>Sign in with your UCLA e-mail to begin your journey.</p>
              <button onClick={() => window.location.href = 'http://localhost:8080/auth/oauth'} className="login-button">
                Sign In
              </button>
          </div>
        ) : (
        <div className='big-home-container'>    
          <h1 className='title'>Internship Tracker</h1>
          <div className='home-button-containers'>
            <button onClick={ () => navigate('/newform')} className="add-internship">Add Internship</button>
            <button onClick={sortByDate} className="home-sort-date"> Sort by Deadline </button>
          </div>
          <div>
            <button onClick={()=> forClick('major', 'Ling & CS')}></button>
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
            </div> 
          </div>
        </div>
        )}
      </div>
    );
  }
  
        
export default Home;
   