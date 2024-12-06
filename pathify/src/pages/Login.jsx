import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext.jsx'

const Login = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    if (user) { navigate('/'); }
  }, [user])

  const loginGoogle = () => {
    window.open('http://localhost:8080/auth/oauth', '_self')
  }

  return(
    <div>
      <p>You are currently {user ? 'signed in' : 'signed out'}</p>
      <button onClick={() => navigate('/')}>Return to Home Page</button>
      {!user ? (
        <button onClick={loginGoogle}>Sign In with Google</button>
      ) : (
        <button onClick={logout}>Sign Out </button>
      )}
    </div>
  );
}

export default Login;