import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext.jsx'
import { getProfile, editProfile } from '../services/profileServices.js';

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [data, setData] = useState(null);
  const [invisible, setInvisible] = useState(new Set());
  const [username, setUsername] = useState('');
  const [major, setMajor] = useState('');
  const [industry, setIndustry] = useState('');
  const [experiences, setExperiences ] = useState([]);

  const populateData = async () => {
    const data = await getProfile();
    console.log(data[0]);
    setUsername(data[0].username);
    setMajor(data[0].major);
    setIndustry(data[0].industry);
    setExperiences(data[0].experiences);
    setData(data[0]);
  }
  useEffect(() => {
    populateData();
  }, []);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username == '' || major == '' || industry == '') {
      return;
    }

    console.log('Submitting data:', { username, major, industry, experiences });
    const updatedExperiences = experiences.filter((_, index) => !invisible.has(index));
    await editProfile(username, major, industry, updatedExperiences);    
    navigate('/profile');
  }

  const DeleteButton = ({index}) => {
    const handleClick = () => {         
      event.preventDefault();

      if (confirm("Are you sure you want to delete this internship?")) {
        setInvisible(prevSet => new Set(prevSet.add(index)));
      }
    }
    return(<button onClick={()=> handleClick()}>X</button>);
  }

  return (
    data == null ? <p>Loading...</p> :(
    <div>
      {/* Form for submitting jobs */}
      <h3 className="home-form-title"> Edit Profile Page </h3>
      <div className='home-form-container'>
        <form className='home-form' onSubmit={handleSubmit}>
          <label className='home-form-label' htmlFor='company-name'> Username </label>
          <input className='home-form-input' type="text"  name="company-name" placeholder="Company Name" 
            onChange={(e) => { setUsername(e.target.value); }} value={username}/>

          <label className='home-form-label' htmlFor='position-title'> Major </label>
          <input className='home-form-input' type="text" name="position-title" placeholder="Position Title" 
            onChange={(e) => { setMajor(e.target.value); }} value={major}/>

          <label className='home-form-label' htmlFor='application-deadline'> Industry</label>
          <input className='home-form-input' type="text" name="application-deadline" placeholder="Application Deadline: MM/DD/YYYY"
            onChange={(e) => { setIndustry(e.target.value); }} value={industry}/>
          
          {!experiences ? (<div>N/A</div>) : experiences.map((row, index) => {
            if (invisible.has(index)) return null;
            return (
              <div key={index}>
                <DeleteButton index={index} />
                  <label className='home-form-label' htmlFor='company-name'> Company </label>
                  <input className='home-form-input' type="text"  name="company-name" placeholder="Company Name" 
                      onChange={(e) => { 
                        const updatedExp = [...experiences];
                        updatedExp[index] = { ...row, company: e.target.value};
                        setExperiences(updatedExp); 
                      }}
                      value={row.company}/>

                  <label className='home-form-label' htmlFor='company-name'> Job Title</label>
                  <input className='home-form-input' type="text"  name="company-name" placeholder="Company Name"
                      onChange={(e) => { 
                        const updatedExp = [...experiences];
                        updatedExp[index] = { ...row, job: e.target.value};
                        setExperiences(updatedExp); 
                      }}
                      value={row.job}/>

                  <label className='home-form-label' htmlFor='company-name'> Start date</label>
                  <input className='home-form-input' type="text"  name="company-name" placeholder="Company Name" 
                      onChange={(e) => { 
                        const updatedExp = [...experiences];
                        updatedExp[index] = { ...row, start: e.target.value};
                        setExperiences(updatedExp); 
                      }}
                      value={row.start}/>

                  <label className='home-form-label' htmlFor='company-name'> End date</label>
                  <input className='home-form-input' type="text"  name="company-name" placeholder="Company Name" 
                      onChange={(e) => { 
                        const updatedExp = [...experiences];
                        updatedExp[index] = { ...row, end: e.target.value};
                        setExperiences(updatedExp); 
                      }}
                      value={row.end}/>

                  <label className='home-form-label' htmlFor='company-name'> Description </label>
                  <input className='home-form-input' type="text"  name="company-name" placeholder="Company Name" 
                      onChange={(e) => { 
                        const updatedExp = [...experiences];
                        updatedExp[index] = { ...row, description: e.target.value};
                        setExperiences(updatedExp); 
                      }}
                      value={row.description}/>

                  <label className='home-form-label' htmlFor='company-name'> Reflection</label>
                  <input className='home-form-input' type="text"  name="company-name" placeholder="Company Name" 
                      onChange={(e) => { 
                          const updatedExp = [...experiences];
                          updatedExp[index] = { ...row, reflection: e.target.value};
                          setExperiences(updatedExp); 
                      }}
                      value={row.reflection}/>
              </div>
            )} 
          )}
          <button className="home-form-buttons" type="submit"> Done </button>
        </form>
      </div>
    </div>)
  );
}

export default EditProfile;