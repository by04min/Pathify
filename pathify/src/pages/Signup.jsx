import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = () => {
    alert(`Signing up: ${username} ${password}`);
  }
  return(
    <>
      <h1>Pathify</h1>
      <h4>Sign up</h4>
      <form className="login" onSubmit={handleSubmit}>
      <div>
          <label>
            Username: 
            <input type='text' value={username} onChange={e => setUsername(e.target.value)}/>
          </label>
        </div>
        <div>
          <label>
            Password: 
            <input type='text' value={password} onChange={e => setPassword(e.target.value)}/>  
          </label>
        </div>
        <button type='submit'>Signup</button>
      </form>
      <>Already have an account? </>
      <button onClick={()=> {navigate('/login')}}>Login here</button>
    </>
  )
}

export default Login;