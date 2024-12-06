import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext.jsx'
import { editProfile } from '../services/profileServices.js';
import './EditProfile.css'

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, profile, setProfile, loading } = useContext(AuthContext);

  const [invisible, setInvisible] = useState(new Set());
  const [username, setUsername] = useState('');
  const [major, setMajor] = useState('');
  const [industry, setIndustry] = useState('');
  const [experiences, setExperiences ] = useState([]);

  // if empty or dateError, error message should be displayed
  const [empty, setEmpty] = useState(false);
  const [dateError, setDateError] = useState(null);

  const populateData = async () => {
    console.log('populating data: ', profile);
    if (profile) {
      setUsername(profile.username);
      setMajor(profile.major);
      setIndustry(profile.industry);
      setExperiences(profile.experiences);
    }
  }
  useEffect(() => {
    console.log('edit profile is: ', profile);
    if (!loading && profile) {
      populateData();
    }
  }, [loading, profile]);

  const handleCancel = () => { navigate('/profile'); }
  
  const handleSubmit = async (event) => {
    await setEmpty(false);
    event.preventDefault();

    if (username == '' || major == '' || industry == '') {
      setEmpty(true);
      return;
    }

    const minStartDate = new Date('1950-01-01');
    const currentDate = new Date();
    const maxEndDate = new Date();
    if (experiences && experiences.length != 0) {
      maxEndDate.setFullYear(currentDate.getFullYear() + 10);

      const invalidDates = experiences.some((experience) => {
        const startDate = new Date(experience.start);
        const endDate = new Date(experience.end);
        
        if(startDate > endDate){
          setDateError("End date must be later than the start date.");
          return true;
        } else if (startDate < minStartDate){
          setDateError("Start date must be later than 01/01/1950.");
          return true;
        } else if (endDate > maxEndDate){
          setDateError("End date must be no later than 10 years from the current date.");
          return true;
        } else if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())){
          setDateError("Not a valid start or end date (MM/DD/YYYY).");
          return true;
        }
      });

      if (invalidDates) {
        return;
      }
    }
    console.log('Submitting data:', { username, major, industry, experiences });
    const updatedExperiences = experiences.filter((_, index) => !invisible.has(index));
    const updatedProfile = { ...profile, username, major, industry, experiences: updatedExperiences };
    await editProfile(username, major, industry, updatedExperiences, profile.privacy); 
    await setProfile(updatedProfile);
    navigate('/profile');
  }

  const DeleteButton = ({index}) => {
    const handleClick = () => {         

      if (confirm("Are you sure you want to delete this internship?")) {
        setInvisible(prevSet => new Set(prevSet.add(index)));
      }
    }
    return(<button className="delete-experience" onClick={()=> handleClick()}>❌</button>);
  }

  return (
    (loading || !profile) ? <p>Loading...</p> :(
    <div>
      {/* Form for submitting jobs */}
      <h3 className="editProf-form-title"> Edit Profile Page </h3>
      <div className='editProf-form-container'>
        <form className='editProf-form' onSubmit={handleSubmit}>
          <label className='editProf-form-label' htmlFor='company-name'> Name </label>
          <input className='editProf-form-input' type="text"  name="company-name" 
            onChange={(e) => { setUsername(e.target.value); }} value={username}/>

          <label className='editProf-form-label' htmlFor='application-deadline'> Industry</label>
          <input className='editProf-form-input' type="text" name="application-deadline" placeholder="Enter Industry"
            onChange={(e) => { setIndustry(e.target.value); }} value={industry}/>

          <label className='editProf-form-label' htmlFor='position-title'> Major </label>
          <input className='editProf-form-input' type="text" name="position-title" placeholder="Enter Major" 
            onChange={(e) => { setMajor(e.target.value); }} value={major}/>
          
          {(experiences && experiences.length > 0) ? experiences.map((row, index) => {
            if (invisible.has(index)) return null;
            return (
              <div key={index}>
                <div className='experience-container'>
                  <div className='delete-experience-container'> <DeleteButton index={index} /> </div>
                  <div className='editProf-Header-Container'>
                    <label className='editProf-header-label' htmlFor='company-name'>Company</label>
                    <input className='editProf-header-input' type="text"  name="company-name" placeholder="Company Name" 
                        onChange={(e) => { 
                          const updatedExp = [...experiences];
                          updatedExp[index] = { ...row, company: e.target.value};
                          setExperiences(updatedExp); 
                        }}
                        value={row.company}/>
                  </div>
                  <div className='editProf-Header-Container'>
                    <label className='editProf-header-label' htmlFor='job-title'>Job Title</label>
                    <input className='editProf-header-input' type="text"  name="job-title" placeholder="Job Title"
                        onChange={(e) => { 
                          const updatedExp = [...experiences];
                          updatedExp[index] = { ...row, job: e.target.value};
                          setExperiences(updatedExp); 
                        }}
                        value={row.job}/>
                  </div>
                  <div className='editProf-Header-Container'>
                    <label className='editProf-header-label' htmlFor='start-date'>Start Date</label>
                    <input className='editProf-header-input' type="date"  name="start-date" placeholder="Start Date" 
                        onChange={(e) => { 
                          const updatedExp = [...experiences];
                          updatedExp[index] = { ...row, start: e.target.value};
                          setExperiences(updatedExp); 
                        }}
                        value={row.start}/>
                  </div>
                  <div className='editProf-Header-Container'>
                    <label className='editProf-header-label' htmlFor='end-date'>End Date</label>
                    <input className='editProf-header-input' type="date"  name="end-date" placeholder="End Date" 
                        onChange={(e) => { 
                          const updatedExp = [...experiences];
                          updatedExp[index] = { ...row, end: e.target.value};
                          setExperiences(updatedExp); 
                        }}
                        value={row.end}/>

                  </div>
                </div>

                {/* Below helps with formatting the rows */}
                <div>
                    <label className='editProf-form-label' htmlFor='role-description'>Description</label>
                    <input className='editProf-form-input' type="text"  name="role-description" placeholder="Enter your Role's description" 
                        onChange={(e) => { 
                          const updatedExp = [...experiences];
                          updatedExp[index] = { ...row, description: e.target.value};
                          setExperiences(updatedExp); 
                        }}
                        value={row.description}/>

                    <label className='editProf-form-label' htmlFor='reflection'> Reflection</label>
                    <input className='editProf-form-input' type="text"  name="reflection" placeholder="Reflect on your experience" 
                        onChange={(e) => { 
                            const updatedExp = [...experiences];
                            updatedExp[index] = { ...row, reflection: e.target.value};
                            setExperiences(updatedExp); 
                        }}
                        value={row.reflection}/>
                </div>
               
              </div>
            )} 
          ) : (<div>No experiences to edit.</div>) }
          {
          empty ? (<h5 className="editProf-error-message">Do not leave rows empty</h5>) : dateError ? (<h5 className="editProf-error-message">{dateError}</h5>) : (<></>)
          }
          <div className="profile-buttons">
          <button className="editProf-form-buttons" onClick={handleCancel}>Cancel</button>
          <button className="editProf-form-buttons" type="submit"> Done </button>
          </div>
        </form>
      </div>
    </div>)
  );
}

export default EditProfile;