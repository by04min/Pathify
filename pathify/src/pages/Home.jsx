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

    // Sort using Jonathon's backend implementation
    // const sortByDate = () => {
    //     const sortedSheet = [...sheet].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    //     setSheet(sortedSheet);
    // };

    // filler until I merge with Jonathon's branch

    // const [tableData, setTableData] = useState([
    //     {
    //         company: 'Microsoft',
    //         position: 'Product Manager Internship',
    //         deadline: '2024-11-15',
    //         status: 'Applied',
    //         interview: 'Interviewed',
    //         decision: 'Not Released',
    //     },
    //     {
    //         company: 'Google',
    //         position: 'Software Engineer Intern',
    //         deadline: '2024-10-20',
    //         status: 'Not Applied',
    //         interview: 'Not Scheduled',
    //         decision: 'Not Released',
    //     },
    //     {
    //         company: 'Amazon',
    //         position: 'Data Analyst Intern',
    //         deadline: '2024-12-01',
    //         status: 'Applied',
    //         interview: 'Scheduled',
    //         decision: 'Not Released',
    //     },
    // ]);

    // const sortByDate = () => {
    //     const sortedData = [...tableData].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    //     setTableData(sortedData);
    // };

    
    // return(
    //     <div>
    //         {!user ? (
    //             <div className="default-welcome">
    //                 <h1>Welcome to Pathify</h1>
    //                 <p>Sign in to begin your jouney.</p>
    //                 <button onClick={() => window.location.href = 'http://localhost:8080/auth/oauth'} className="login-button">
    //                     Sign In
    //                 </button>
    //             </div>
    //         ) : (

    //         <div className='big-home-container'>    
    //             <h1 className='title'>Internship Tracker</h1>
    //             <div>
    //             {/* Table Tracker */}
    //             <button className='home-sort-date' onClick={sortByDate}>  Sort Table by Application Deadline </button>
    //             <div className='table-container'>
    //                 <table>
    //                     <thead>
    //                         {/* Main Header Row */}
    //                         <tr> 
    //                             <th> Company </th>
    //                             <th> Position Title </th>
    //                             <th> Application Deadline </th>
    //                             <th> Status </th>
    //                             <th> Interview </th>
    //                             <th> Decision </th>
    //                         </tr>
    //                     </thead>
    //                     {/* tbody contains our data with jobs people applied to etc.  */}
    //                     <tbody> 
    //                              {tableData.map((row, index) => (
    //                                 <tr key={index}>
    //                                     <td>{row.company}</td>
    //                                     <td>{row.position}</td>
    //                                     <td>{row.deadline}</td>
    //                                     <td><StatusDropdown /></td>
    //                                     <td><InterviewDropdown /></td>
    //                                     <td><DecisionDropdown /></td>
    //                                 </tr>
    //                             ))}
    //                     </tbody>
    //                 </table>
    //             </div> 

    //                 {/* Form for submitting jobs */}
    //                 <h3 className="home-form-title"> Add New Job Listing </h3>
    //                 <div className='home-form-container'>
    //                     <form className='home-form'>
    //                         <label className='home-form-label' htmlFor='company-name'> Company Name* </label>
    //                         <input className='home-form-input' type="text" placeholder="Enter Company Name" name="company-name" required></input>

    //                         <label className='home-form-label' htmlFor='position-title'> Position Title* </label>
    //                         <input className='home-form-input' type="text" placeholder="Enter Position Title" name="position-title"required ></input>

    //                         <label className='home-form-label' htmlFor='application-deadline'> Application Deadline* </label>
    //                         <input className='home-form-input' type="text" placeholder="Enter Application Deadline" name="application-deadline"required ></input>
                            
    //                         <button className="home-form-buttons" type="submit"> Submit </button>
    //                     </form>
    //                 </div>

    //             </div>
    //         </div>
    //         )}
    //     </div>
    // );
}

export default Home;