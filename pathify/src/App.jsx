import { useState, useEffect } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import {AuthProvider} from './components/AuthContext.jsx'
import 'react'
import './App.css'

import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import RowForm from './pages/RowForm.jsx';
import AuthCallback from './components/AuthCallback.jsx'
import Profile from './pages/Profile.jsx'
import EditProfile from './pages/EditProfile.jsx'
import Settings from './pages/Settings.jsx'
import Connection from './pages/Connection.jsx'
import AddNewExperience from './pages/AddNewExperience.jsx'
import OtherProfile from './pages/OtherProfile.jsx'

function App() {
  const [theme, setTheme] = useState('light');
  const [navColor, setNavColor] = useState('#333');

  // stores user display preferences for light/dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []); // effect runs only when the component is first rendered, unless localStorage theme contents are changed

  const toggleTheme = () => {
    // if current theme is light, change it to dark; otherwise, set to light
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    // applies theme globally to highest level of DOM (i.e. all components of app conform to the relevant light/dark theme)
    const rootTheme = document.documentElement;
    rootTheme.className = theme; // entire page is styled based on class of root element
  }, [theme]); // effect runs whenever theme state is changed

  // store user display color preferences for naviation bar
  useEffect(() => {
    const savedNavColor = localStorage.getItem('navColor');
    if (savedNavColor) {
      setNavColor(savedNavColor);
    }
  }, []);

  const updateNavColor = (navCol) => {
    // dynamically updates navigation bar color based on user-determined color
    setNavColor(navCol.hex);
    localStorage.setItem('navColor', navCol.hex)
  };

  const resetNavColor = () => {
    setNavColor("#333") // restores default navigation bar colors
  }

  return (
    <div className='app'>
      <BrowserRouter>
        <AuthProvider>
          <Navbar navColor={navColor}/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/newform" element={<RowForm/>}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/edit-profile" element={<EditProfile/>}/>
            <Route path="/auth/callback" element={<AuthCallback/>}/>
            <Route path="/profile/:username" element={<OtherProfile/>}/>
            <Route path="/add-new-experience" element={<AddNewExperience/>}/>
            <Route path="/connection" element={<Connection/>}/>
            <Route path="/settings" element={<Settings toggleTheme={toggleTheme} navColor={navColor} updateNavColor={updateNavColor} resetNavColor={resetNavColor} />}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
