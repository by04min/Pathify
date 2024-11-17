import React, { useState, useRef } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const successRef = useRef(null);

  const client_id = process.env.CLIENT_ID;

  const loginGoogle = () => {
    window.open('http://localhost:8080/auth/oauth', '_self')
  }
  const handleLogin = async () => {
    try {
      const res = await fetch('/auth/oauth', 
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', },
        }
      );

      if (!res.ok) { throw new Error('Login failed'); }

      const data = await res.json();
      const { user, token } = data;

      console.log('User: ', user, 'JWT token: ', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } catch (err) { console.error('Error logging in with Google', err); }
  }

  const handleError = async(error) => { console.log('Login failed: ', error); }
  return(
    <>
      <h1>Pathify</h1>
      <h2>Login</h2>
      <button onClick={() => { loginGoogle() }}>
        GOOGLE
      </button>
      {/* <form className="login" onSubmit={handleSubmit}>
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
      </form> */}
      <>Don't have an account? </>
      <button onClick={()=> {navigate('/signup')}}>Signup here</button>
    </>
  )
}

export default Login;