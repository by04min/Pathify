import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = () => {
    alert(`Logging in: ${username} ${password}`);
  }
  return(
    <>
      <h1>Pathify</h1>
      <h2>Login</h2>
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
        <button type='submit'>Login</button>
      </form>
      <>Don't have an account? </>
      <button onClick={()=> {navigate('/signup')}}>Signup here</button>
    </>
  )
}

export default Login;