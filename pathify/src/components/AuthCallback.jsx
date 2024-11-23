import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';

const AuthCallback = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('token');

        if (token) {
          login(token);
          navigate('/profile');
        } else navigate('/login');
    }, [login, navigate])
}

export default AuthCallback;